function getPark(){
    $('.findParks').on('click',function(e){
        e.preventDefault();
        $('.nameOfState , .parks').empty();
        results = $('.howMany').val();
        states = $('.enterParks').val();
        statesArray = states.trim().split(" ") 
        parks = statesArray.join(",");
        makeObject();
    })
}

function makeObject(){
        daObj = {
        stateCode: `${parks}`,
        api_key :"0iGs2tabjMHhfad8OSOoEU7JKgZ0xQhyG8xhdtl5",      
    }
    makeIntoQs(daObj);
}

function makeIntoQs(x){
   const queryAtt = Object.keys(x)
  .map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(x[key])}`);
   params = queryAtt.join("&");  
   buildFetch();
   
}
 
function buildFetch(){
    const baseUrl = "https://developer.nps.gov/api/v1/parks";
    url = baseUrl + "?" + params;
    console.log(url)
    fetchParks();
}

function fetchParks(){
    fetch(url)
    .then(function(response){
      return response.json()
    }).then(function(responseJson){
        console.log(responseJson);
        showParks(responseJson);
    })
   
};       

function showParks(x){
    $('h2').text(`${states}`);
    for( i = 0; i < results; i++){
        $('.parks').append(`<li><b>${x.data[i]["fullName"]}</b> 
        <p>${x.data[i]["description"]}</p>
        <a href="${x.data[i]["url"]}">https://www.nps.gov/cali/index.htm</a>
        </li>`)
    }
}
{/* <p>${x.data[i]["addresses"][0].postalCode}${x.data[i]["addresses"][0].city} */}
        {/* ${x.data[i]["addresses"][0].stateCode}${x.data[i]["addresses"][0].line1}</p> */}





function ready(){
    getPark();
}

$(ready());