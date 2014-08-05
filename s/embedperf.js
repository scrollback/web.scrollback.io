console.log(new Date().getTime() - start, this.sb.q);

this.sb=function() {
  console.log('call after load', arguments);
};
