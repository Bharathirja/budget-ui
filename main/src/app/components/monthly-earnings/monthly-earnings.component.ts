import { Component, Input, ViewChild } from '@angular/core';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    NgApexchartsModule,
} from 'ng-apexcharts';

import { MaterialModule } from 'src/app/material.module';
import { CurrencyPipe } from '@angular/common';

export interface monthlyChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    responsive: ApexResponsive;
}

@Component({
    selector: 'app-monthly-earnings',
    imports: [NgApexchartsModule, MaterialModule, CurrencyPipe],
    templateUrl: './monthly-earnings.component.html',
})
export class AppMonthlyEarningsComponent {
    @ViewChild('chart') chart: ChartComponent = Object.create(null);
    public monthlyChart!: Partial<monthlyChart> | any;
    @Input() totalTransactions: number = 0;
    constructor() {
        this.monthlyChart = {
            series: [
                {
                    name: '',
                    color: '#49BEFF',
                    data: [25, 66, 20, 40, 12, 58, 20],
                },
            ],

            chart: {
                type: 'area',
                fontFamily: "'Plus Jakarta Sans', sans-serif;",
                foreColor: '#adb0bb',
                toolbar: {
                    show: false,
                },
                height: 85,
                sparkline: {
                    enabled: true,
                },
                group: 'sparklines',
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                colors: ['#E8F7FF'],
                type: 'solid',
                opacity: 0.05,
            },
            markers: {
                size: 0,
            },
            tooltip: {
                theme: 'dark',
                x: {
                    show: false,
                },
            },
        };
    }
}
