import { useMemo } from 'react';
import ReactFromJSON from 'react-from-json';
import { useData } from 'vike-react/useData';

import { ChartBlock } from '@/components/page-blocks/chart-block';
import { ContainerBlock, RowBlock } from '@/components/page-blocks/layout-blocks';

import { Data } from './+data';

const mapping = {
  container: ContainerBlock,
  row: RowBlock,
  chart: ChartBlock,
};

function mapProp(prop: any): any {
  if (prop == null) return null;
  const { type, items, ...rest } = prop;

  return {
    type,
    props: {
      ...rest,
      children: items?.map(mapProp),
    },
  };
}

export function Page() {
  const chartConfig = useData<Data>();

  const contentConfig = chartConfig.currentDetail.content;
  const processedConfig = useMemo(() => mapProp(contentConfig), [contentConfig]);

  return processedConfig && <ReactFromJSON entry={processedConfig} mapping={mapping} />;
}

/*
    <ContainerBlock>
      <RowBlock title="Emissions">
        <ChartBlock
          dataset="Overview1"
          x="YEAR"
          y="VALUE"
          series="TECHNOLOGY:Sector"
          options={{
            type: 'area',
            stacked: true,
            legend: false,
            extraProps: {
              chart: {
                syncId: 'year',
              },

              chartComponents: {
                XAxis: {
                  tickLine: true,
                },
              },
            },
          }}
        />
        <ChartBlock
          dataset="Overview1agg"
          x="YEAR:Period"
          y="VALUE"
          series="TECHNOLOGY:Sector"
          options={{
            type: 'bar',
            stacked: true,
            extraProps: {
              chartSeries: {
                barSize: 70,
              },
            },
          }}
        />
      </RowBlock>
      <RowBlock title="Costs">
        <ChartBlock
          dataset="Overview2"
          x="YEAR"
          y="VALUE"
          series="CostType"
          options={{
            type: 'area',
            stacked: true,
            legend: false,
            extraProps: {
              chart: {
                syncId: 'year',
                stackOffset: 'sign',
              },
              chartSeries: {
                dot: false,
              },
              chartComponents: {
                XAxis: {
                  tickLine: true,
                },
                ChartLegend: {
                  align: 'right',
                  verticalAlign: 'top',
                  layout: 'vertical',
                },
              },
            },
          }}
        />
        <ChartBlock
          dataset="Overview2agg"
          x="YEAR:Period"
          y="VALUE"
          series="CostType"
          options={{
            type: 'bar',
            stacked: true,
            legend: 'right',
            extraProps: {
              chartSeries: {
                barSize: 70,
              },
            },
          }}
        />
      </RowBlock>
    </ContainerBlock>

*/
