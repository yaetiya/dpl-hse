<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
  import { Badge } from "$lib/components/ui/badge";
  export let users;
</script>

<Accordion.Root class="w-full" multiple={true}>
  {#each users as u}
    <Accordion.Item value={u.id}>
      <Accordion.Trigger
        ><div style="display: flex;">
          {u.name}
          {#if u.expand.agent.name}<Badge class="ml-3" variant="secondary"
              >Агент: {u.expand.agent.name}</Badge
            >{/if}
          {#if u.badgeText}<Badge class="ml-3">{u.badgeText}</Badge>{/if}
        </div></Accordion.Trigger
      >
      <Accordion.Content style="white-space: pre-line">{u.description}</Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
