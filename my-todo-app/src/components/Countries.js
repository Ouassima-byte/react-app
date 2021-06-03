import React ,{useState,useEffect} from 'react'

var url="";
var Array=[];
var All=[];

const Countries = () => {
    const [countries,setCountries]=useState([]);
    useEffect(()=>{
        url="https://restcountries.eu/rest/v2/all";
        const fetchcountriesData=async()=>{
            const response=await fetch(url);
            const countries=await response.json();
            setCountries(countries)
            console.log(countries);
         }
        fetchcountriesData()
       },[])
     
    return (
        <>
            <section className="filter">
                <form className="form-control">
                    <input 
                    type="search" 
                    name="search"
                    id="search" placeholder="search for a country"
                    onKeyPress={(e)=>{
                        if (e.key === 'Enter'){
                            let value=e.target.value;
                            e.preventDefault();
                            let status=false;
                            if(value.length>2){
                                 url=`https://restcountries.eu/rest/v2/name/${value}`;
                            }
                            else{
                                url=`https://restcountries.eu/rest/v2/alpha/${value}`;
                                status=true;
                            }
                            let table=[];
                            const fetchcountriesData=async()=>{
                                const response=await fetch(url);
                                const countries=await response.json();
                                if(status){
                                    table.push(countries);
                                     setCountries(table);
                                }
                                else
                                    setCountries(countries);
                            }
                            fetchcountriesData();
                        }
                    }}
                    />
                    
                    <a href="#"
                    onClick={()=>{
                        All=Object.entries(localStorage);
                        for(let i=0;i<All.length;i++){
                            Array.push(JSON.parse(All[i][1]))
                        }
                        setCountries(Array);
                    }}
                    >List visited countries</a>
                </form>
            </section>
            <section className="grid">
                {countries.map((country)=>{
                    const {numericCode,name,population,region,capital,flag,subregion,alpha2Code}=country
                    return <article key={numericCode}>
                        <img src={flag} alt={name}/>
                        <div className="details">
                            <h3>{name}</h3>
                            <h4>Population :<span>{population}</span></h4>
                            <h4>region :<span>{region}</span></h4>
                            <h4>subregion :<span>{subregion}</span></h4>
                            <h4>capital :<span>{capital}</span></h4>
                            <h4>alpha2Code :<span>{alpha2Code}</span></h4>
                            
                                <input 
                                type="submit"
                                value="add"
                                onClick={()=>{
                                    let obj={
                                        'name':country.name ,
                                        'population':country.population,
                                        'flag':country.flag,
                                        'region':country.region,
                                        'subregion':country.subregion,
                                        'capital':country.capital,
                                        'numericCode':country.numericCode,
                                        'alpha2Code':country.alpha2Code
                                    }
                                    localStorage.setItem(country.numericCode,JSON.stringify(obj));
                                }

                                }
                            />
                                <input 
                                type="submit"
                                value="Remove"
                                id="remove"
                                onClick={()=>{
                                    localStorage.removeItem(country.numericCode);
                                    All=Object.entries(localStorage);
                                    Array=[];
                                    for(let i=0;i<All.length;i++){
                                        Array.push(JSON.parse(All[i][1]))
                                    }
                                    setCountries(Array);
                                }

                                }
                            />
                        </div>
                    </article>
                    
                })}
            </section>
        </>
    )
}

export default Countries

