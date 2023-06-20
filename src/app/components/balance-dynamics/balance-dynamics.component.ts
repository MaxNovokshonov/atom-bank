import {Component, Input, OnInit} from '@angular/core';
import {BalanceDict, Transactions} from "../../interfaces/interfaces";
import {EChartsOption} from 'echarts';

@Component({
  selector: 'app-balance-dynamics',
  templateUrl: './balance-dynamics.component.html',
  styleUrls: ['./balance-dynamics.component.scss']
})
export class BalanceDynamicsComponent implements OnInit {
  @Input() title = ''
  @Input() id: string;
  @Input() transactions: Transactions[];
  chartOption: EChartsOption

  constructor() {
  }

  ngOnInit(): void {
    this.getData();
    if (this.title === 'Динамика баланса') {
      this.chartOption = {
        legend: {
          data: ['Все переводы'],
          align: 'left',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: this.getData().legend,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#1D2027',
          },
        },
        series: [
          {
            name: 'Все переводы',
            type: 'bar',
            itemStyle: {
              color: '#32BE4B',
            },
            barCategoryGap: '20%',
            data: this.getData().dynamicsPerMonth,
          },
        ],
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };
    } else {
      this.chartOption = {
        legend: {
          data: ['Входящие переводы', 'Исходящие переводы'],
          align: 'left',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: this.getData().legend,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#1D2027',
          },
        },
        series: [
          {
            name: 'Входящие переводы',
            type: 'bar',
            itemStyle: {
              color: '#32BE4B',
            },
            barCategoryGap: '20%',
            data: this.getData().positiveDynamicsPerMonth,
          },
          {
            name: 'Исходящие переводы',
            type: 'bar',
            itemStyle: {
              color: '#EB5757',
            },
            barCategoryGap: '20%',
            data: this.getData().negativeDynamicsPerMonth,
          },
        ],
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };
    }

  }

  getData() {
    const balanceDict: BalanceDict = {};

    for (let i = this.transactions.length - 1; i >= 0; i--) {
      const month = new Date(this.transactions[i].date).getMonth() + 1;
      const year = new Date(this.transactions[i].date).getFullYear();
      let income = 0;
      let costs = 0;
      income
        += this.id === this.transactions[i].from ? Math.abs(this.transactions[i].amount) : 0;
      costs
        += this.id === this.transactions[i].from ? 0 : Math.abs(this.transactions[i].amount);

      if (balanceDict[year]) {
        if (balanceDict[year][month]) {
          balanceDict[year][month].to += income;
          balanceDict[year][month].from += costs;
        } else {
          balanceDict[year][month] = {to: income, from: costs};
        }
      } else {
        balanceDict[year] = {};
        balanceDict[year][month] = {to: 0, from: 0};
        balanceDict[year][month] = {to: income, from: costs};
      }
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const legend = Object.entries(balanceDict[currentYear])
      .filter((el) => {
        if (el[0] <= currentMonth.toString()) {
          return el[0];
        }
        return el[0];
      })
      .map((el) => el[0])
      .map((el) => new Date(el).toLocaleString('ru', {
        month: 'long',
      }));

    const filteredDynamics = Object.entries(balanceDict[currentYear])
      .filter((el) => {
        if (el[0] <= currentMonth.toString()) {
          return el[0];
        }
        return el[0];
      })

    const positiveDynamicsPerMonth = filteredDynamics
      .map((el) => el[1].from)
      .map((el) => Math.floor(el));

    const negativeDynamicsPerMonth = filteredDynamics
      .map((el) => el[1].to)
      .map((el) => Math.floor(el));

    const dynamicsPerMonth = filteredDynamics
      .map((el) => el[1].to + el[1].from)
      .map((el) => Math.floor(el));



    return {
      legend,
      dynamicsPerMonth,
      negativeDynamicsPerMonth,
      positiveDynamicsPerMonth,
    };
  }
}
