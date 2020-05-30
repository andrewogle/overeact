function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container){
    //create dom node and then append to container if the 
    // element is a type is text then we create a text node  
    const dom = element.type ==="TEXT_ELEMENT" 
        ? document.createTextNode("")
        : document.createElement(element.type)

    const isProperty = key => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    
    element.props.children.forEach(child => {
        render(child, dom)
    });

    container.appendChild(dom)
}

const overeact = {
    createElement,
    render,
}



/** @jsx overeact.createElement */
const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )

overeact.render(element, container)