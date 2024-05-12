<script lang="ts">
  import Chart from "./charts/chart.svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import { onMount } from "svelte";

  export let charts: any[];
  onMount(() => {
    console.log(charts);

    agents = charts.map((x) => ({ name: x.agent, id: x.agent }));
    
  });
  let agents:any = [];
</script>

<div class="wrapper">
  <h2 class="leading-7 mt-10 mb-2">Аналитика по агентам</h2>
  <Accordion.Root class="w-full" multiple={true}>
    {#each agents as a}
      <Accordion.Item value={a.id}>
        <Accordion.Trigger>
          <div style="display: flex;">
            {a.name}
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div class="row">
            <div class="elem">
              <Chart
                Ylabel="Запросы"
                Xlabel="Дата"
                title="Всего запросов"
                data={charts.find((c) => c.agent === a.id).stats}
              />
            </div>
            <!-- <div class="elem">
              <Chart
                Ylabel="Запросы"
                Xlabel="Дата"
                title="Всего запросов"
                data={charts.find((c) => c.agent === a.id)}
              />
            </div> -->
          </div>
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</div>

<style lang="scss">
  h2 {
    font-size: 28px;
    font-weight: bold;
  }
  .row {
    // display: flex;
    // width: 100%;
    // justify-content: start;
    // .elem {
    //   width: calc(50% - 5px);
    //   padding-right: 10px;
    // }
  }
</style>
