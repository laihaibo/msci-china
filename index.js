const puppeteer = require('puppeteer');

import { init, saveOne, editOne } from './src/utils/db';
import data from './src/api/source';
import ShareModel from './src/model/ShareModel';

// 初始化data
const onInit = data => {
  init({ shares: [] });
  data.map(x => saveOne('shares', new ShareModel(x)));
};

async function spider(stock) {
  const { code, isSH } = stock;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `http://quote.eastmoney.com/${isSH ? 'sh' : 'sz'}${code}.html`;

  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const result = await page.evaluate(() => {
    // 所属行业
    const trade = document.querySelector(
      'body > div.page-body > div:nth-child(11) > div > div.nav > a:nth-child(3)'
    ).innerHTML;
    // 动态市盈率
    const pe = document.querySelector('#gt6_2').innerHTML;
    // 市净率
    const pb = document.querySelector('#gt13_2').innerHTML;
    // 净资产
    const jzc = document
      .querySelector('#rtp2 > tbody > tr:nth-child(2) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 营收
    const revenue = document
      .querySelector('#rtp2 > tbody > tr:nth-child(3) > td:nth-child(1)')
      .innerHTML.substring(3);
    // 营收同比
    const rvinc = document
      .querySelector('#rtp2 > tbody > tr:nth-child(3) > td:nth-child(2)')
      .innerHTML.split('：')[1];
    // 净利润
    const jlr = document
      .querySelector('#rtp2 > tbody > tr:nth-child(4) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 净利润同比
    const jlrinc = document
      .querySelector('#rtp2 > tbody > tr:nth-child(4) > td:nth-child(2)')
      .innerHTML.split('：')[1];
    // 毛利率
    const mll = document
      .querySelector('#rtp2 > tbody > tr:nth-child(5) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 净利率
    const jll = document
      .querySelector('#rtp2 > tbody > tr:nth-child(5) > td:nth-child(2)')
      .innerHTML.split('：')[1];
    // roe
    const roe = document
      .querySelector('#rtp2 > tbody > tr:nth-child(6) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 负债率
    const fzl = document
      .querySelector('#rtp2 > tbody > tr:nth-child(6) > td:nth-child(2)')
      .innerHTML.split('：')[1];
    // 总股本
    const zgb = document
      .querySelector('#rtp2 > tbody > tr:nth-child(7) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 总值
    const zz = document.querySelector('#gt7_2').innerHTML;
    // 流通股
    const ltg = document
      .querySelector('#rtp2 > tbody > tr:nth-child(8) > td:nth-child(1)')
      .innerHTML.split('：')[1];
    // 流通值
    const lz = document.querySelector('#gt14_2').innerHTML;
    // 每股未分配利润
    const mgwfplr = document
      .querySelector('#rtp2 > tbody > tr:nth-child(9) > td')
      .innerHTML.split('：')[1];
    // 上市时间
    const sssj = document
      .querySelector('#rtp2 > tbody > tr:nth-child(10) > td')
      .innerHTML.split('：')[1];

    const name = document.querySelector('#name').innerHTML;

    return {
      name,
      trade,
      pe,
      pb,
      jzc,
      revenue,
      rvinc,
      jlr,
      jlrinc,
      mll,
      jll,
      roe,
      fzl,
      zgb,
      zz,
      ltg,
      lz,
      mgwfplr,
      sssj
    };
  });

  console.log(result);

  const one = Object.assign({}, result, stock);

  editOne('shares', new ShareModel(one));

  await browser.close();
}

async function dospider(data) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < data.length; i++) {
    const { isSH, code } = data[i];
    const url = `http://quote.eastmoney.com/${isSH ? 'sh' : 'sz'}${code}.html`;

    await page.goto(url, {
      waitUntil: 'networkidle2'
    });

    const result = await page.evaluate(() => {
      // 所属行业
      const trade = document.querySelector(
        'body > div.page-body > div:nth-child(11) > div > div.nav > a:nth-child(3)'
      ).innerHTML;
      // 动态市盈率
      const pe = document.querySelector('#gt6_2').innerHTML;
      // 市净率
      const pb = document.querySelector('#gt13_2').innerHTML;
      // 净资产
      const jzc = document
        .querySelector('#rtp2 > tbody > tr:nth-child(2) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 营收
      const revenue = document
        .querySelector('#rtp2 > tbody > tr:nth-child(3) > td:nth-child(1)')
        .innerHTML.substring(3);
      // 营收同比
      const rvinc = document
        .querySelector('#rtp2 > tbody > tr:nth-child(3) > td:nth-child(2)')
        .innerHTML.split('：')[1];
      // 净利润
      const jlr = document
        .querySelector('#rtp2 > tbody > tr:nth-child(4) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 净利润同比
      const jlrinc = document
        .querySelector('#rtp2 > tbody > tr:nth-child(4) > td:nth-child(2)')
        .innerHTML.split('：')[1];
      // 毛利率
      const mll = document
        .querySelector('#rtp2 > tbody > tr:nth-child(5) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 净利率
      const jll = document
        .querySelector('#rtp2 > tbody > tr:nth-child(5) > td:nth-child(2)')
        .innerHTML.split('：')[1];
      // roe
      const roe = document
        .querySelector('#rtp2 > tbody > tr:nth-child(6) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 负债率
      const fzl = document
        .querySelector('#rtp2 > tbody > tr:nth-child(6) > td:nth-child(2)')
        .innerHTML.split('：')[1];
      // 总股本
      const zgb = document
        .querySelector('#rtp2 > tbody > tr:nth-child(7) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 总值
      const zz = document.querySelector('#gt7_2').innerHTML;
      // 流通股
      const ltg = document
        .querySelector('#rtp2 > tbody > tr:nth-child(8) > td:nth-child(1)')
        .innerHTML.split('：')[1];
      // 流通值
      const lz = document.querySelector('#gt14_2').innerHTML;
      // 每股未分配利润
      const mgwfplr = document
        .querySelector('#rtp2 > tbody > tr:nth-child(9) > td')
        .innerHTML.split('：')[1];
      // 上市时间
      const sssj = document
        .querySelector('#rtp2 > tbody > tr:nth-child(10) > td')
        .innerHTML.split('：')[1];

      const name = document.querySelector('#name').innerHTML;

      return {
        name,
        trade,
        pe,
        pb,
        jzc,
        revenue,
        rvinc,
        jlr,
        jlrinc,
        mll,
        jll,
        roe,
        fzl,
        zgb,
        zz,
        ltg,
        lz,
        mgwfplr,
        sssj
      };
    });

    const one = Object.assign({}, result, data[i]);

    editOne('shares', new ShareModel(one));

    continue;
  }

  await browser.close();
}

dospider(data);
