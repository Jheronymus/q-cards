import React from 'react';
import './App.css';
import { useMHub } from './hooks/useMHub';
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

const App = () => {
  const [state, setState] = React.useState({
    items: [
      {text: 'add items via on-q'}
    ]
  });

  let [lastMsg, send] = useMHub('ws://' + window.location.hostname + ':13900', 'cards');

  React.useEffect(() => {
    switch(typeof(lastMsg)){
      case 'object':
        if(lastMsg){
          setState({
            items: state.items.concat({text: JSON.stringify(lastMsg) as string})
          });
        }
        break;
      case 'string':
        setState({
          items: state.items.concat({text: (lastMsg) as string})
        });
        break;
      default:
        console.log("skipping " + typeof(lastMsg));
        console.log(lastMsg);
    }
  }, [lastMsg]);

  return (
    <div className="App">
      <Carousel verticalMode itemsToShow={3}>
        {state.items.map((item, index) => <Item key={index}>{item.text}</Item>)}
      </Carousel>
    </div>
  );
}

export default App;
