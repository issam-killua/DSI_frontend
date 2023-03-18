import ArticlesPerTopic from "./components/ArticlesPerTopic"
import './App.css';
import AuthorChart from './components/AuthorChart';
import CircleChart from './components/CircleChart';
import BarChart from "./components/DateChart";
import DateChart from "./components/DateChart";

function App() {
  return (
    <div className="App">
      <div class="container mx-auto" >
        <div
        className="rounded-lg bg-red-700 text-white p-6 text-neutral-700 shadow-lg my-2 ">
        <h2 className="mb-5 text-3xl font-semibold">News Data Visualisation</h2>
        <p>
          This is a simple frontend that contains some charts of data from the bbc news.
        </p>

        </div>
        <div class="flex-wrap justify-center gap-4 my-2">
          <div class="bg-white p-4 mb-4 drop-shadow-md">
            <h1 class="border-b p-2 text-4xl" >Date chart</h1>
            <div class="flex" >
              <DateChart  />
              <div class="text-xl  p-2 flex flex-col justify-center content-center " >
                The number of articles published each day 
              </div>
            </div>
          </div>
          <div class="bg-white p-4 mb-4 drop-shadow-md">
            <h1 class="border-b p-2 text-4xl" >Authors chart</h1>
            <div class="flex" >
              <AuthorChart  />
              <div class="text-xl  p-2 flex flex-col justify-center content-center " >
                This chart represents the number of Article for each author or authors 
              </div>
            </div>
          </div>
          <div class="bg-white p-4 mb-4 drop-shadow-md">
            <h1 class="border-b p-2 text-4xl" >Ratio of articles by authors</h1>
           <div class="flex" >
            <CircleChart  />
              <div class="text-xl  p-2 flex flex-col justify-center content-center " >
                This chart represents the pourcentage of the number of Article for each author or authors done in pie. Each color represents an author. In our case the author with the most articles is Kathryn Armstrong. unfortunately some articles doesnt contain any authors
              </div>
           </div>
          </div>
          <div class="bg-white p-4  mb-2 drop-shadow-md">
            <h1 class="border-b p-2 text-4xl" >Ratio of articles by topics</h1>
           <div class="flex" >
            <ArticlesPerTopic  />
              <div class="text-xl  p-2 flex flex-col justify-center content-center " >
                This chart represents the number of articles by topic. As you can see the Coronavirus Pandemic topic is the one thats dominating in the news articles
              </div>
           </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
