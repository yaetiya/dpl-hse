<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index";
  import { Separator } from "$lib/components/ui/separator/index";
  import { cn } from "$lib/utils.js";

  import Chatbot from "./chatbot.svelte";
  import ManageAgents from "./manageAgents.svelte";
  import Nav from "./nav.svelte";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
  import Advices from "./advices.svelte";
  import Charts from "./charts.svelte";
  import type { Route } from "src/config";
  import * as Icons from "../icons.js";
  import Dialogs from "./dialogs.svelte";

  let routes: Route[] = [
    {
      title: "Менеджер схем",
      icon: Icons.Inbox,
      variant: "default",
      name: "manage-schemes",
    },
    {
      title: "Управление Агентами",
      icon: Icons.File,
      variant: "ghost",
      name: "manage-agents",
    },
    {
      title: "Статистика",
      icon: Icons.Archive,
      variant: "ghost",
      name: "statistics",
    },
    // {
    //   title: "Советы",
    //   icon: Icons.CircleAlert,
    //   variant: "ghost",
    //   name: "advices",
    // },
    {
      title: "Диалоги и пользователи",
      icon: Icons.MessagesSquare,
      variant: "ghost",
      name: "dialogs",
    },
  ];

  export let defaultLayout = [265, 440, 655];
  export let defaultCollapsed = false;
  export let navCollapsedSize: number = 4;
  const pb = new PocketBase("https://mado.one/pbsb");

  let agents: any[] = [];
  let advices: any[] = [];
  let dialogs: any[] = [];
  let charts: any[] = [];

  const setupCharts = () => {
    const agents = [...new Set(dialogs.map((d) => d.expand.agent.name))];
    charts = agents.map((agent) => {
      const agentDialogs = dialogs.filter((d) => d.expand.agent.name === agent);
      return {
        agent: agent,
        stats: agentDialogs.reduce((acc, dialog) => {
          const day = dialog.created.split(" ")[0]; // Assuming 'created' is a datetime string
          // console.log(day)
          const dateToTimestamp = (dateString: string): number =>
            new Date(dateString).getTime();
          const timestamp = dateToTimestamp(day);
          const el = acc.find((x: any) => x.x == timestamp);
          if (!el) {
            acc = [...acc, { x: timestamp, y: 1 }];
          } else {
            el.y = el.y + 1;
          }
          return acc;
        }, []),
      };
    });

    // dialogs.reduce(,[])
  };
  onMount(async () => {
    [agents, advices, dialogs] = await Promise.all([
      pb.collection("agents").getFullList({
        sort: "-created",
      }),
      pb.collection("advices").getFullList({
        sort: "-created",
      }),
      pb.collection("dialogs").getFullList({
        sort: "-created",
        expand: "agent",
      }),
    ]);
    setupCharts();
  });
  async function switchAgentStatus(id: string, newIsActive: boolean) {
    pb.collection("agents").update(id, {
      isActive: newIsActive,
    });
  }
  async function addAgent(name: string) {
    const res = await pb.collection("agents").create({
      name: name,
      type: "telegram",
      isActive: true,
    });
    agents = [res, ...agents];
    return agents;
  }
  async function deleteAgent(id: string) {
    const res = await pb.collection("agents").delete(id);
    agents = agents.filter((x) => x.id != id);
    return agents;
  }

  let isCollapsed = defaultCollapsed;

  // function onLayoutChange(sizes: number[]) {
  //   document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
  // }

  // function onCollapse() {
  //   isCollapsed = true;
  //   document.cookie = `PaneForge:collapsed=${true}`;
  // }

  // function onExpand() {
  //   isCollapsed = false;
  //   document.cookie = `PaneForge:collapsed=${false}`;
  // }
</script>

<div class="md:hidden">Откройте страницу с ПК</div>
<Tabs.Root
  class="hidden md:block"
  value={localStorage.getItem("route") || "manage-schemes"}
  onValueChange={(n) => {
    n && localStorage.setItem("route", n);
    if (n == "manage-schemes") {
      window.location.reload();
    }
  }}
>
  <Tabs.List class="w-full">
    {#each routes as route}
      <Tabs.Trigger
        value={route.name}
        class={cn("justify-start", {
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white":
            route.variant === "default",
        })}
      >
        <svelte:component
          this={route.icon}
          class="mr-2 size-4"
          aria-hidden="true"
        />
        {route.title}
        {#if route.label}
          <span style="margin-left: 6px;">
            {`(${route.label})`}
          </span>
        {/if}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>

  <Tabs.Content value="manage-schemes">
    <Chatbot />
  </Tabs.Content>
  <div class="wrapper">
    <div class="container">
      <Tabs.Content value="manage-agents">
        <ManageAgents {agents} {switchAgentStatus} {addAgent} {deleteAgent} />
      </Tabs.Content>

      <Tabs.Content value="dialogs">
        <Dialogs users={dialogs} />
      </Tabs.Content>
      <Tabs.Content value="statistics">
        {#if charts.length}
          <Advices {advices} />
          <Charts {charts} />
        {/if}
      </Tabs.Content>
    </div>
  </div>
</Tabs.Root>

<!-- <Resizable.PaneGroup
  direction="horizontal"
  {onLayoutChange}
  class="items-stretch"
>
  <Resizable.Pane
    defaultSize={defaultLayout[0]}
    collapsedSize={navCollapsedSize}
    collapsible
    minSize={15}
    maxSize={20}
    {onCollapse}
    {onExpand}
  >
    <Nav {isCollapsed} routes={primaryRoutes} />
    <Separator />
    <Nav {isCollapsed} routes={secondaryRoutes} />
  </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
    <Chatbot />
  </Resizable.Pane>
</Resizable.PaneGroup> -->

<style>
  .wrapper {
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .container {
    max-width: 700px;
  }
</style>
