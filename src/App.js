import './App.css';
import { Helmet } from "react-helmet";
import {useState, useEffect} from 'react';
import data from './data.json';

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [question_ID, setQuestion_ID] = useState(0);
  const [gridElements, setGridElements] = useState([]);
  const [selectedText, setSelectedText] = useState('');


  let grid;

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  console.log(data)

  

  function randomListSelect() {
    let a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let array = (a.slice(a.indexOf('a'), a.indexOf('z') + 1)); 

    let grid_size
    let step
    if (difficulty === 'easy') {
      grid_size = 9;
      step = 3
    }
    // else if (difficulty === 'medium') {
    //   grid_size = 16;
    //   step = 4
    // }else{
    //   grid_size = 25;
    //   step = 5
    // }


    if (question_ID>1 && question_ID <4){ 
      grid_size = 16;
      step = 4
    }
    if (question_ID>3){
      grid_size = 25;
      step = 5
    }


    let result = []
    for(let i=0; i<grid_size; i++){
      result.push(getRandomItem(array))
    }
    console.log(question_ID)
    console.log(difficulty)
    console.log(result)
    let answer_array = data[question_ID].answer.split('')
    let randomindex_already = []
    for(let i=0; i<step; i++){
      let randomIndex = Math.floor(Math.random() * result.length);
      while (randomindex_already.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * result.length);
        // randomindex_already.push(randomIndex)
      }
      result[randomIndex] = answer_array[i]
      randomindex_already.push(randomIndex)
    }
    console.log(result)
    setGridElements(result)
    return result;
  }


  useEffect(() => {
    if (question_ID<6){
      randomListSelect()
    }

    if (question_ID>1 && question_ID <4){ 
      setDifficulty('medium')
      // randomListSelect()
    }
    if (question_ID>3){
      setDifficulty('hard')
      // randomListSelect()
    }


  }, [question_ID])

  useEffect(() => {

  }, [selectedText])

  
  
  if (question_ID<6 && selectedText===data[question_ID].answer){
    setQuestion_ID(question_ID + 1)
    setSelectedText('')

    randomListSelect()
  }

  const actionOnClick = (item) => {
    if (difficulty === 'easy') {
      if (selectedText.length < 3) {
        setSelectedText(selectedText + item)
      }
    }else if (difficulty === 'medium') {
      if (selectedText.length < 4) {
        setSelectedText(selectedText + item)
      }
    }else {
      if (selectedText.length < 5) {
        setSelectedText(selectedText + item)
      }
    }
  }

  const resetSelectedText = () => {
    setSelectedText('')
  }

  console.log(selectedText)

  
  if (difficulty==='easy') {
    grid = (
      <div className='grid' style={{display:'grid', gridTemplateColumns: '100px 100px 100px', gridTemplateRows: '100px 100px 100px'}}>
        {gridElements.map((item, index) => {
          return (
            <div className={`gridbox box${index}`} onClick={e => actionOnClick(item)} style={{padding:'10px', borderRadius:'2px', borderColor:'white', borderStyle:'solid', background:'#3e3f42', opacity:'0.4'}}>
              {/* <div className='grid-item-inner'> */}
                {/* <div className='grid-item-inner-inner'> */}
                  <div style={{textAlign:'center', marginTop: '25px'}} >{item}</div>
                {/* </div> */}
              {/* </div> */}
            </div>
          ) 
        })}
      </div>
    )
  }else if (difficulty==='medium') {
    grid = (
      <div className='grid' style={{display:'grid', gridTemplateColumns: '75px 75px 75px 75px', gridTemplateRows: '75px 75px 75px 75px'}}>
        {gridElements.map((item, index) => {
          return (
            <div className={`gridbox box${index}`} onClick={e => actionOnClick(item)} style={{padding:'10px', borderRadius:'2px', borderColor:'white', borderStyle:'solid', background:'#3e3f42', opacity:'0.4'}}>
              {/* <div className='grid-item-inner'> */}
                {/* <div className='grid-item-inner-inner'> */}
                  <div style={{textAlign:'center', marginTop: '15px'}} >{item}</div>
                {/* </div> */}
              {/* </div> */}
            </div>
          ) 
        })}
      </div>
    )
  }else{
    grid = (
      <div className='grid' style={{display:'grid', gridTemplateColumns: '60px 60px 60px 60px 60px', gridTemplateRows: '60px 60px 60px 60px 60px'}}>
        {gridElements.map((item, index) => {
          return (
            <div className={`gridbox box${index}`} onClick={e => actionOnClick(item)} style={{padding:'10px', borderRadius:'2px', borderColor:'white', borderStyle:'solid', background:'#3e3f42', opacity:'0.4'}}>
              {/* <div className='grid-item-inner'> */}
                {/* <div className='grid-item-inner-inner'> */}
                  <div style={{textAlign:'center', marginTop: '10px'}} >{item}</div>
                {/* </div> */}
              {/* </div> */}
            </div>
          ) 
        })}
      </div>
    )
  }



  return (
    <div className="App">
      <Helmet>
        <style>
          {'body { background: linear-gradient(180deg, #000 50%, #b06661 160%); color: #e5e5e5; }'}
        </style>
      </Helmet>
      <div style={{ position: "relative", overflowY: "hidden", overflowX: "hidden", height: '98.0vh' }}>
        <div>
          <h1 style={{textAlign:'center'}}>Elitmus Task</h1>
          <br />
        </div>
        {question_ID<6 &&
        <div className='mid-lower' >
          <div className='Question' style={{display:'flex',  justifyContent: 'center'}}>
            <h3 style={{margin:'20px'}}>{data[question_ID].question}</h3>
          </div>
          <div style={{display:'flex',  justifyContent: 'center', marginTop:'30px'}}>
            <div style={{textAlign: 'center', color:'black', padding: '10px', width:'120px', height: '20px', borderRadius: '5px', background: 'linear-gradient(135deg, #3e3f42 10%, #fff 60%, #3e3f42 90%)' }}>
              {selectedText}
            </div>
            <div style={{marginTop:'10px', marginRight:'-40px', marginLeft:'10px'}} onClick={e => resetSelectedText()}>reset</div>
          </div>

          <div className='Answer' style={{display:'flex',  justifyContent: 'center', marginTop:'10px'}}>
            {grid}
          </div>
          <div style={{display:'flex',  justifyContent: 'center', marginTop:'10px'}}> 
            <p>*touch the alphabets to make a word</p>
          </div>
          <div className='difficulty' style={{display:'flex',  justifyContent: 'center', marginTop:'15px'}}> 
            <div style={{marginTop:'10px', marginRight: '10px', marginLeft: '-10px'}}>
              Level -
            </div> 
            <div style={{textAlign: 'center', padding: '10px', width:'120px', borderRadius: '5px', background: 'linear-gradient(135deg, #114016 50%, #32a852 160%)' }}>
              {difficulty}
            </div>
          </div>
        </div>
        }
        {question_ID===6 &&
          <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
            You've won the game!
          </div>
        }
      </div>
    </div>
  );
}

export default App;
