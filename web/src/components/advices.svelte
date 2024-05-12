<script lang="ts">
  import * as Alert from "$lib/components/ui/alert";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Table from "$lib/components/ui/table";
  import { Lightbulb, Terminal, Trash2 } from "lucide-svelte";
  export let advices: any[] = [];
</script>

{#each advices as ad}
  <Alert.Root class="mb-2" variant={ad.isAlert ? "destructive" : "default"}>
    <Lightbulb class="h-4 w-4" />
    <Alert.Title>{ad.title}</Alert.Title>
    <Alert.Description>{ad.text}</Alert.Description>
  </Alert.Root>
{/each}
