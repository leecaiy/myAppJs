const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const _测试部门清单="http://www.zjzwfw.gov.cn/zjservice/home/corporate/index.do?webId=3&classify=6&subHeadId=001008001024005&subHeadName="+encodeURI(encodeURI("区发改经信局（区支援合作局）"))
const _测试网址="http://www.zjzwfw.gov.cn/zjservice/home/corporate/getPersonalItemList.do?1=1&webid=3&pagesize=&pageno=&type=2&classify=6&subHeadId=001008001024005&name=%E5%8C%BA%E5%8F%91%E6%94%B9%E7%BB%8F%E4%BF%A1%E5%B1%80%EF%BC%88%E5%8C%BA%E6%94%AF%E6%8F%B4%E5%90%88%E4%BD%9C%E5%B1%80%EF%BC%89&word=&impleType=&serviceType=&isnoline=1&plc=&tongBanFlag="
const _测试网址数组=[ 'http://www.zjzwfw.gov.cn/zjservice/home/corporate/getPersonalItemList.do?',{webid: '3',type: '2',classify: '6',subHeadId: '001008001024005',name: '区发改经信局（区支援合作局）',isnoline: '1'}]
const 发改例子网址="http://www.zjzwfw.gov.cn/zjservice/item/detail/index.do?localInnerCode="+"c026b3ea-5932-46fb-aaba-f2e8d7474b3f"

_fetchUrlResponse_事项明细new()
function _fetchUrlResponse_事项明细new(url=发改例子网址,log=false){
  var myHtml = fs.readFileSync("./1.html", 'utf-8');
  var $=cheerio.load(myHtml);

  var 事项明细Json={'事项名称':'','受理机构':''}
  var table_基本信息='body > div.zjzw-main > div.zjzw-matter.contentWidth > div.zjzw-matter-detail.clearfix > div.zjzw-matter-detail-left.lf > div > table > tbody';
  //$(table_基本信息 +'> tr > td:odd').prev().map(dd1).get()
  var table_基本信息_第二个='body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div> table > tbody ';
  //$(table_基本信息_第二个 +'> tr > td:odd').prev().map(dd1).get()
      function dd1(index,element){
        事项明细Json[$(element).text().replace(/[\s]+/g,"")]=$(element).next().text().replace(/[\s]+/g,"");
      }

  var 线下办事地点='body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div.zjzw-procedure-tabItem.offLinePlace > div.offLinePlaceWrap > div > div.offline-office-textNew.lf > p > span'
  //$(线下办事地点).map(dd2).get();
  var 申请条件='body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div > div > p > span'
  //$(申请条件).map(dd2).get(); 
      function dd2(index,element){
        事项明细Json[$(element).prev().text().replace(/[\s]+/g,"")]=$(element).text().trim();
      } 
  var 申请材料1='body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(4) > div.sbcl_table_con > div > div.prev.lf > span'
  var 申请材料明细='body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(4) > div.sbcl_table_con > div > div.sbcls.swiper-container > div.sbcl_tables.swiper-wrapper > div > div > span'
  let temp=[[]];
  for (var i=0;i<$(申请材料1).length;i++){
    //let temp=[];
    temp[1]=$(申请材料1).children().toArray()[0].innerHTML
  }
  console.log(temp )
  

   console.log(事项明细Json)



   /*  function 表格格式返回(index){  var p1=$(this).text().replace(/[\s ]+/g,"");p2=$(this).next().text().replace(/[\s ]+/g,"");return [[index+1,p1,p2]]}
    function 材料明细后返回(index){  var p1=$(this).children().map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");材料[index].push(p1);return (材料[index].join("||")+p1)}
    function 表格合并后返回(index){  var p1=$(this).children().map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");return index+1 +"||" +p1}
    function 申请依据后返回(index){  var p1=$(this).find('*').filter(function(){ var $this = $(this);return $this.children().length == 0 && ($this.text().replace(/\s+/g,"")).length > 0; })
                  .map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");return index+1 +"||" +p1}
  
    */
}







function _fetchUrlResponse_事项明细 (url=发改例子网址,log=false){    //返回包含json的Promise，可以继续.then()
  return  fetch(url).then(value=>value.text())
         .then( value=>_getOneDoc(value))
         .then(el=>{  if (log) {console.log(el)}; return el})
         .catch(e=>console.log(e+'sorry1'));   
}


function _fetchUrlResponse_部门清单 (url=_测试部门清单,log=false){    //返回包含json的Promise，可以继续.then()
  return  fetch(url).then(value=>value.text())
         .then( function (resText){
               var $ = cheerio.load(resText); 
               var 部门事项=$('body > div.content.topic_mid > div > ul > li > a');          
               var 事项=部门事项.map(dd).get();
               function dd(index,el){
                 var temp={},tt; temp.编号=index+1;tt=$(this).attr("onclick").match(/(?<=').+?(?=')/g);
                  temp.部门名称=tt[2];temp.id=tt[0];
                 return temp
               }
               if (log) {console.log("_fetchUrlResponse_部门清单\n",事项)};
               return 事项
         })
         .catch(e=>console.log(e+'sorry2'));   
}


//const 区住建局='http://www.zjzwfw.gov.cn/zjservice/home/corporate/getPersonalItemList.do?1=1&webid=3&pagesize=150&pageno=1&type=2&classify=6&subHeadId=001008001024011&name=%E5%8C%BA%E4%BD%8F%E5%BB%BA%E5%B1%80%EF%BC%88%E5%8C%BA%E4%BA%BA%E9%98%B2%E5%8A%9E%EF%BC%89&word=&impleType=&serviceType=&isnoline=1&plc=&tongBanFlag='
//_fetchUrlResponse_部门_事项清单(区住建局,true)
function _fetchUrlResponse_部门_事项清单 (url=_测试网址,log=false){    //返回包含json的Promise，可以继续.then()
         return  fetch(url).then(value=>value.text())
                .then( function (resText){
                      let 子项='body > li > ul > li > div.item_subtitle.item_twoTitle.leafNode'
                      let 孙项='body > li > ul > ul > li > div.item_subtitle.leafNode'
                      var $ = cheerio.load(resText); 
                      var 部门事项=$(子项+','+孙项);
                      var 事项=部门事项.map(dd).get();
                      function dd(index){
                        var temp={};temp.编号=index+1;
                          if ($(this).is('.item_twoTitle')) {
                            temp.事项名称=$(this).text().replace(/\s+/g,""); 
                            temp.网址编码=$(this).attr("onclick").replace(/(bszn\(\'|\'\))/g,'')
                            temp.主项名称=$(this).parent().parent().prev('div.item_title').text().replace(/\s+/g,""); 
                            temp.子项名称=temp.事项名称; 
                            temp.孙项名称='无'; 
                          }else  {
                            temp.事项名称=$(this).text().replace(/\s+/g,""); 
                            temp.网址编码=$(this).attr("onclick").replace(/(bszn\(\'|\'\))/g,'')
                            temp.主项名称=$(this).parent().parent().prev('li.item_threeTitle').text().replace(/\s+/g,""); 
                            temp.子项名称=$(this).parent().parent().prev('li.item_threeTitle').text().replace(/\s+/g,""); 
                            temp.孙项名称=temp.事项名称; 
                          }

                        return temp
                      }
                      if (log) {console.log(事项)};
                      return 事项
                })
                .catch(e=>console.log(e+'sorry3'));   
  }
  
function _urlToParamAndURL(ourl=_测试网址, log=false) {      /*获取完整的网址，返回['url','paragm']的数组*/ 
    var back=[],paragm={};var temp=""
    back[0]=ourl.match(/http:\/\/.+(?<=\?)/i)[0];
    temp=ourl.match(/(?<=&)[^&]+/g)
    temp.forEach( (x)=> {var s=x.split('='); if(s[1]!="") { paragm[s[0]]=s[1]}});
    back[1]=paragm;back[1].name=decodeURI(decodeURI(back[1].name));
    if (log) {console.log(back)};
    return back
  }

  function _paramAndURLToUrl(paragm=_测试网址数组, log=false) {      /*获取完整的网址，返回['url','paragm']的数组*/ 
    var url=paragm[0];
    for (let i in paragm[1]){url=url+i +"="+ paragm[1][i]+"&"};url=url.slice(0,-1)
    if (log) {console.log(url)};
    return url
  }


  
function _getOneDoc(html){
  var $=cheerio.load(html)
      var 数据 = [];
      function 表格格式返回(index){  var p1=$(this).text().replace(/[\s ]+/g,"");p2=$(this).next().text().replace(/[\s ]+/g,"");return [[index+1,p1,p2]]}
      function 材料明细后返回(index){  var p1=$(this).children().map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");材料[index].push(p1);return (材料[index].join("||")+p1)}
      function 表格合并后返回(index){  var p1=$(this).children().map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");return index+1 +"||" +p1}
      function 申请依据后返回(index){  var p1=$(this).find('*').filter(function(){ var $this = $(this);return $this.children().length == 0 && ($this.text().replace(/\s+/g,"")).length > 0; })
                  .map( function(){ return $(this).text().replace(/[\s ]+/g,"") }).get().join("||");return index+1 +"||" +p1}
      var 基本信息A = "body > div.zjzw-main > div.zjzw-matter.contentWidth > div.zjzw-matter-detail.clearfix > div.zjzw-matter-detail-left.lf > div > table > tbody > tr > td:nth-child(odd)"
      //test 表格格式返回 ok
      var 基本信息B ="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(1) > table > tbody > tr > td:nth-child(odd)"
      //test 表格格式返回 ok
      var 线下办事点 ="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div.zjzw-procedure-tabItem.offLinePlace > div.offLinePlaceWrap > div > div.offline-office-textNew.lf > p"
      //test 表格格式返回 ok
      var 基本条件  ="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(3) > div > p > *:nth-child(1)"
      //test 表格格式返回 ok
      var 申请材料清单="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(4) > div.sbcl_table_con > div > div.prev.lf > span > *:nth-child(1)"
      //test  材料明细//test 表格格式返回 ok
      var 收费依据 ="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(7) > div > p > strong"
      //test 表格格式返回 ok
      var 常见问题 ="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(8) > div > table > tbody > tr"
      问题=$(常见问题).map(申请依据后返回).get();
      //test 表格格式返回 ok
      /* 下面的数据需要单独处理*/
      var 材料=$(申请材料清单).map(表格格式返回).get();
      var 申请材料明细="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(4) > div.sbcl_table_con > div > div.sbcls.swiper-container > div.sbcl_tables.swiper-wrapper > div > div"
      材料=$(申请材料明细).map(材料明细后返回).get();
      //test 材料明细后返回   ok
      var 办事流程="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(5) > div > div.Process-flow-table > span > table > tbody > tr"
      var 流程=$(办事流程).map(表格合并后返回).get()

      var 设定依据="body > div.zjzw-main > div.zjzw-procedure.contentWidth > div.zjzw-procedure-tabItemWrap > div:nth-child(6) > div > table > tbody"
      var 依据=$(设定依据).map(申请依据后返回).get()

      数据= 数据.concat($(基本信息A).map(表格格式返回).get());
      数据= 数据.concat($(基本信息B).map(表格格式返回).get());
      数据= 数据.concat($(线下办事点).map(表格格式返回).get());
      数据= 数据.concat($(收费依据).map(表格格式返回).get());       
      数据= 数据.concat($(基本条件).map(表格格式返回).get());
      数据= 数据.concat([[10000+问题.length,"常见问题",材料.join("|__|")]]);
      数据= 数据.concat([[10000+材料.length,"申请材料",材料.join("|__|")]]);
      数据= 数据.concat([[10000+流程.length,"办事流程",流程.join("|__|")]]);
      数据= 数据.concat([[10000+依据.length,"设定依据",依据.join("|__|")]]);
      //var x=[].concat($(基本信息A).map(表格格式返回).get(),$(基本信息B).map(表格格式返回).get())

      var tidy = function(arr) {
          var i = 0,j = arr.length, cache = {},key, result = [];
          for (; i < j; i++) {
              key = arr[i][1];
              key = typeof(key) + key;
              if (!cache[key]) {
                  cache[key] = 1;
                  result.push(arr[i]);
                  arr[i][0]=i;
              }
          }
          return result;
      };
  
      var toJson = function(arr) {
          var i = 0,j = arr.length, cache = {},key, result = {受理机构:"",事项名称:""};
          for (; i < j; i++) {
              key = arr[i][1];
              key = typeof(key) + key;
              if (!cache[key]) {
                  cache[key] = 1;
                  result[arr[i][1]]=arr[i][2]
                }
          }
          return result;
      };

      var bc=toJson(数据);
      return bc;   
}



  exports.fetchUrlResponse_事项明细= _fetchUrlResponse_事项明细//(undefined,true)
  exports.fetchUrlResponse_部门清单=_fetchUrlResponse_部门清单 //_fetchUrlResponse_部门_事项清单(undefined,true)
  exports.fetchUrlResponse_部门_事项清单=_fetchUrlResponse_部门_事项清单 //_fetchUrlResponse_部门_事项清单(undefined,true)
  exports.paramAndURLToUrl=_paramAndURLToUrl
  exports.urlToParamAndURL=_urlToParamAndURL
