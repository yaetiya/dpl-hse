<script lang="ts">
  import * as Alert from "$lib/components/ui/alert";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Table from "$lib/components/ui/table";
  import { Terminal, Trash2 } from "lucide-svelte";
  export let agents: any[] = [];
  export let switchAgentStatus: any;
  export let addAgent: any;
  export let deleteAgent: any;
  let agentName = "";
</script>

<Alert.Root class="mb-10">
  <Terminal class="h-4 w-4" />
  <Alert.Title>Добавьте агента</Alert.Title>
  <Alert.Description
    >Агент сможет автоматизировать работу с лидами или обработку поступающих
    заявок.
  </Alert.Description>
  <div class="mt-3" style="max-width: 300px;">
    <Input placeholder="Имя агента" bind:value={agentName} />
    <Button
      variant="secondary"
      class="mt-2"
      disabled={!agentName}
      on:click={() => {
        addAgent(agentName);
        agentName = "";
      }}>Добавить агента</Button
    >
  </div>
</Alert.Root>
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Status</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Type</Table.Head>
      <Table.Head>ID</Table.Head>
      <Table.Head class="text-right">Action</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each agents as agent}
      <Table.Row>
        <Table.Cell
          ><Badge>{agent.isActive ? "Активирован" : "Выключен"}</Badge
          ></Table.Cell
        >
        <Table.Cell class="font-medium">{agent.name}</Table.Cell>
        <Table.Cell>{agent.type}</Table.Cell>
        <Table.Cell>{agent.id}</Table.Cell>
        <Table.Cell
          style="display: flex; justify-content: right;"
          class="text-right"
          ><Button
            variant={agent.isActive ? "destructive" : "default"}
            on:click={() => {
              switchAgentStatus(agent.id, !agent.isActive);
              agent.isActive = !agent.isActive;
            }}
          >
            {!agent.isActive ? "Активировать" : "Выключить"}
          </Button>
          <Button
            variant="ghost"
            on:click={() => {
              deleteAgent(agent.id);
            }}
          >
            <Trash2
              on:click={() => {
                switchAgentStatus(agent.id, !agent.isActive);
                agent.isActive = !agent.isActive;
              }}
            />
          </Button></Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
