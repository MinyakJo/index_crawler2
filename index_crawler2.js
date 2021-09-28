const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getNews = () => {
    request(
    {
      url: "http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001",
      method: "GET",
      encoding: null,
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }
      if (response.statusCode === 200) {
        console.log("response ok");
        const bodyDecoded = iconv.decode(body, "euc-kr");
        const $ = cheerio.load(bodyDecoded);
        
        const img = $(
            ".coverImage > label > a"
        ).toArray();

        const list_text_inner_arr = $(
          ".rankBestContentList > ol > li > div"
        ).toArray();
  
        const result = [];
        list_text_inner_arr.forEach((div) => {
          const title = $(div).find(".itemName").text().trim();
          const author = $(div).find(".itemMeta .author").text().trim();
          const path = $(div).find("a").first().attr("href");
          // 도메인을 붙인 url 주소
          const url = `http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001${path}`; 
          const imgurl = $(div).find("img").first().attr("src");
          
          result.push({
            url,
            title,
            author,
            imgurl,
          });
        });
        console.log(result);
      }
    });
  };
  
  console.log();
  getNews();