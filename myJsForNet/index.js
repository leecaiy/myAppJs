const {fetchUrlResponse_部门清单,fetchUrlResponse_部门_事项清单,fetchUrlResponse_事项明细} = require('./myfunc');
const XLSX=require('xlsx');var wb = XLSX.utils.book_new();

const 部门清单网址="http://www.zjzwfw.gov.cn/zjservice/home/corporate/index.do?webId=3&classify=6"
                   "&subHeadName="+encodeURI(encodeURI("区发改经信局（区支援合作局）"))+"&subHeadId="+"001008001024005"   //其实是随便一个部门都可以
const 事项网址__前置字段="http://www.zjzwfw.gov.cn/zjservice/home/corporate/getPersonalItemList.do?webid=3&type=2&classify=6&isnoline=1"
                 // +"&pagesize=&pageno=" +"&name="+encodeURI(encodeURI("区发改经信局（区支援合作局）"))+"&subHeadId="+"001008001024005"
const 例子网址__前置字段="http://www.zjzwfw.gov.cn/zjservice/item/detail/index.do?localInnerCode="
                //+"c026b3ea-5932-46fb-aaba-f2e8d7474b3f"


async function test() {
    var 部门清单 = await fetchUrlResponse_部门清单(部门清单网址,false)
                             //.then((result) => {console.log(result) })
                             .catch((error) => { console.log(error,"西湖区 部门清单  出错") })
    var dep=部门清单[2];
    var 事项网址_test=事项网址__前置字段+"&pagesize=150&pageno=1" +"&name="+encodeURI(encodeURI(dep.部门名称))+"&subHeadId="+dep.id;
   // console.log(事项网址_test);
    var 部门_事项清单_test=await fetchUrlResponse_部门_事项清单(事项网址_test,false)
                        // .then((result) => {console.log(result)})
                         .catch((error) => { console.log(error,"单一部门  事项清单   出错") });
    
    var 例子= await Promise.all( 部门_事项清单_test.map(
                                (ss)=>{//console.log(例子网址__前置字段+ ss.网址编码 );
                                    let td=fetchUrlResponse_事项明细(例子网址__前置字段+ ss.网址编码,true);return td;}
                                )
                           //.then((result) => {console.log(result) })
                           ) /*//内部输出
                            //.then((result) => {console.log(result) })
                  .catch((error) => { console.log(error) })  */

        ws = XLSX.utils.json_to_sheet(例子);
        XLSX.utils.book_append_sheet(wb, ws,dep.部门名称);         
        XLSX.writeFile(wb, dep.部门名称+".xlsx" )
    }
test()