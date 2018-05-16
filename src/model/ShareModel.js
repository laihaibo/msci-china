import cuuid from '../utils/uuid';
import { now } from '../utils/time';

export default class ShareModel {
  constructor({
    id,
    code,
    uuid,
    created,
    updated,
    isSH,
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
    sssj,
    name
  }) {
    this.code = code;
    this.created = created ? created : now();
    this.updated = updated ? updated : now();
    this.isSH = isSH ? isSH : code[0] === '6';
    this.trade = trade;
    this.pe = pe;
    this.pb = pb;
    // 净资产
    this.na = jzc;
    // 营收
    this.rv = revenue;
    // 营收同比
    this.rvinc = rvinc;
    // 净利润
    this.np = jlr;
    // 净利润同比
    this.npinc = jlrinc;
    // 毛利润
    this.gm = mll;
    // 净利润
    this.pm = jll;
    this.roe = roe;
    // 负债率
    this.dr = fzl;
    // 总股本
    this.gc = zgb;
    // 总值
    this.gv = zz;
    // 流通股
    this.fs = ltg;
    // 流通值
    this.fv = lz;
    // 每股未分配利润
    this.udpps = mgwfplr;
    // 上市时间
    this.timetm = sssj;
    this.name = name;
    this.id = id;
  }
}
