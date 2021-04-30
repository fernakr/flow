import { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
//import logo from './logo.svg';
//import './App.css';

function Control(props){
  const { name, label, value, changeHandler, step, min, max } = props;
  return (
    <div style={{ marginBottom: '20px'}}>
      <label htmlFor={ name }>{ label }</label>
      <input step={ step } min={ min } max={ max } type="range" defaultValue={ value } onChange={e => changeHandler(e.target.value) }/>
      <div style={{ backgroundColor: '#ececec', padding: '10px'}}>{ value }</div>
    </div>
  )
}

function Controls(props){
  const { updateScaleFactor, scaleFactor, fontSize, updateFontSize, lineHeight, updateLineHeight, headingLineHeight, updateHeadingLineHeight } = props;
  return (
    <div className="controls">
      <Control
        step={ 0.1}
        min={1.2}
        max={1.8}
        label='Scale Factor'
        name='scaleFactor'
        value={ scaleFactor }
        changeHandler={ updateScaleFactor } />
         <Control
        step={ 1 }
        min={14}
        max={20}
        label='Font Size'
        name='fontSize'
        value={ fontSize }
        changeHandler={ updateFontSize } />
         <Control
        step={0.1}
        min={1.2}
        max={1.8}
        label='Line Height'
        name='lineHeight'
        value={ lineHeight }
        changeHandler={ updateLineHeight } />
      <Control
        step={0.1}
        min={1}
        max={1.6}
        label='Heading Line Height'
        name='headingLineHeight'
        value={ headingLineHeight }
        changeHandler={ updateHeadingLineHeight } />
    </div>
  )
}

function Input(props) {
  const { setBody, body, setBodyFont, bodyFont, setHead, head } = props;
  return (
    <form>
      <label htmlFor="bodyFont">Body Font</label>
      <input type="text" name="bodyFont" id="bodyFont" defaultValue={ bodyFont } onChange={ e => setBodyFont(e.target.value) }/>
      <label htmlFor="head">&lt;head&gt;</label>
      <textarea name="head" id="head" cols="30" rows="10" defaultValue={ head } onChange={ e => setHead(e.target.value) }></textarea>
      <label htmlFor="body">&lt;body&gt;</label>
      <textarea name="body" id="body" cols="30" rows="100" defaultValue={ body } onChange={ e => setBody(e.target.value) }></textarea>
    </form>
  )
}

function Content(props){
  const { body, bodyFont } = props;
  return (
    <div className='content' style={{ fontFamily: bodyFont}}
    dangerouslySetInnerHTML={{
      __html: md.render(body)
    }}></div>
  )
}

function Head(props){
  const { head } = props;

  return (
    <div>
      <div
      dangerouslySetInnerHTML={{
        __html: head
      }}></div>
    </div>
  )
}

function App() {
  const [scaleFactor, setScaleFactor] = useState(1.2);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [headingLineHeight, setHeadingLineHeight] = useState(1.2);
  const [fontSize, setFontSize] = useState(16);
  const [bodyFont, setBodyFont] = useState('Open Sans');
  const [head, setHead] = useState(`<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">`);
  const [body, setBody] = useState(`# Kitsch retro

## Typewriter delectus cred

Bushwick Schlitz. Est Shoreditch small batch, dolor Schlitz sapiente twee stumptown ex. Duis Carles pickled, cornhole Thundercats McSweeney's minim PBR vegan Tumblr irony. Kogi eu Thundercats, sed scenester before they sold out et aesthetic. Elit cred Vice ethical pickled sartorial. Stumptown roof party freegan High Life vero, ea sed minim meggings.

## Heading 2
### Truffaut disrupt sartorial deserunt  Truffaut disrupt sartorial deserunt  Truffaut disrupt sartorial deserunt

Cosby sweater plaid shabby chic kitsch pour-over ex. Try-hard fanny pack mumblecore cornhole cray scenester. Assumenda narwhal occupy, Blue Bottle nihil culpa fingerstache. Meggings kogi vinyl meh, food truck banh mi Etsy magna 90's duis typewriter banjo organic leggings Vice.

Cosby sweater plaid shabby chic kitsch pour-over ex. Try-hard fanny pack mumblecore cornhole cray scenester. Assumenda narwhal occupy, Blue Bottle nihil culpa fingerstache. Meggings kogi vinyl meh, food truck banh mi Etsy magna 90's duis typewriter banjo organic leggings Vice.

#### Fingerstache nesciunt lomo nostrud hoodie

- Roof party put a bird on it incididunt sed umami craft beer cred.
- Carles literally normcore, Williamsburg Echo Park fingerstache photo booth twee keffiyeh chambray whatever.
- Scenester High Life Banksy, proident master cleanse tousled squid sriracha ad chillwave post-ironic retro.

##### Heading 5

Laboris selfies occaecat umami, forage Tumblr American Apparel. Retro Terry Richardson culpa id swag polaroid Intelligentsia American Apparel eu, esse non post-ironic fugiat master cleanse. Direct trade gluten-free blog, fanny pack cray labore skateboard before they sold out adipisicing non magna id Helvetica freegan. Disrupt aliqua Brooklyn church-key lo-fi dreamcatcher.
`);

  const headingSelectors = ['h5', 'h4', 'h3', 'h2', 'h1'];

  const updateElems = (selectors, size, property, unit = '') => {
    selectors.forEach(item => {
      item.style[property] = size + unit;
    });
  }


  const updateScaleFactor = (value) => {
    if (value) setScaleFactor(value);
    let currFontSize = fontSize;
    let updatedValue = value || scaleFactor;


    for (const selector of headingSelectors){
      const elements = document.querySelectorAll(selector);
      updateElems(elements, currFontSize, 'fontSize', 'px');
      if (selector.replace('h','') < 4) currFontSize = currFontSize * updatedValue;
    }

  }
  const updateFontSize = (value) => {
    if (value) setFontSize(value);
    const updatedValue = value || fontSize;
    const elements = document.querySelectorAll('.content');
    updateElems(elements, updatedValue, 'fontSize', 'px');
  }
  const updateLineHeight = (value) => {
    if (value) setLineHeight(value);
    const updatedValue = value || lineHeight;
    const elements = document.querySelectorAll('.content');
    updateElems(elements, updatedValue, 'lineHeight');
  }

  const updateHeadingLineHeight = (value) => {
    if (value) setHeadingLineHeight(value);
    const updatedValue = value || headingLineHeight;
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    updateElems(elements, updatedValue, 'lineHeight');
  }

  useEffect(() => {
    updateMargin();
    return () => {}
  }, [lineHeight, fontSize])

  useEffect(() => {
    updateHeadingMargin();
    return () => {}
  }, [headingLineHeight, fontSize])

  const updateMargin = () => {
    const elements = document.querySelectorAll('p');
    const marginBase = lineHeight * fontSize;
    const marginOffset = (lineHeight * fontSize - fontSize)/2;
    const marginActual = marginBase - marginOffset;
    updateElems(elements, marginActual, 'marginBottom','px');
    updateElems(elements, marginActual, 'marginTop','px');
  }

  const updateHeadingMargin = () => {
    //const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    let currFontSize = fontSize;
    for (const selector of headingSelectors){

      const marginBase = lineHeight * fontSize;
      const marginOffset = (headingLineHeight * fontSize - fontSize)/2;
      const marginActual = marginBase - marginOffset;
      const elements = document.querySelectorAll(selector);
      updateElems(elements, marginActual, 'marginBottom', 'px');
      updateElems(elements, marginActual, 'marginTop', 'px');
      if (selector.replace('h','') < 4) currFontSize = currFontSize * scaleFactor;
    }

  }

  updateScaleFactor();
  updateFontSize();
  updateLineHeight();
  updateHeadingLineHeight();  // const updateLineHeight = (value) => {
  //   setLineHeight(value);
  //   const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, ul, ol');
  //   updateElems(elements, value, 'lineHeight');

  // }
  return (
    <div className="App">
      <Head head={ head }/>
      <Controls
        scaleFactor={ scaleFactor }
        updateScaleFactor={ updateScaleFactor }

        lineHeight={ lineHeight }
        updateLineHeight={ updateLineHeight }

        headingLineHeight={ headingLineHeight }
        updateHeadingLineHeight={ updateHeadingLineHeight }

        fontSize={ fontSize }
        updateFontSize={ updateFontSize }
        />

      <div className="body">
        <Input
          setHead={ setHead }
          head= { head }
          setBody={ setBody }
          body={ body }
          bodyFont={ bodyFont }
          setBodyFont={ setBodyFont }/>
        <Content
          body={ body }
          bodyFont={ bodyFont }/>
      </div>
    </div>
  );
}

export default App;
