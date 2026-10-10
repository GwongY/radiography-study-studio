export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));export const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
