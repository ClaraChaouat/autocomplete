# Part 2 - Questions

## 1 - What is the difference between Component and PureComponent? Give an example where it might break my app.

- Component always updates when parent re-redenr.
- Pure components: updates only if Its props or state have a new reference (memory address).

Pure component can break if we change data in place instead of creating a new copy (mutability concept)

## 2 - Context + ShouldComponentUpdate might be dangerous. Why is that?

- shouldComponentUpdate only sees props and state. It never gets the new context value.
- If you return false, React skips the re-render, that means the component keeps using the old context even though the provider just changed.
- Result : the UI shows old data.

=> shouldComponentUpdate can accidentally block context updates, so your component stops reacting to them and displays outdated data.

## 3 - Describe 3 ways to pass information from a component to its PARENT.

- Callback function: function is passed down to the child component as a prop.

- State: the state is managed in the parent component.The parent passes down the state and a function to update it to the child.The child uses this function to request changes to the parent's state.

- Context: Create a context using React.createContext. Wrap the parent component with a provider from the context.The child can access the context and update the parent's state. Useful when sharing data between deeply nesting nested components, avoiding prop drilling.

## 4 - Give 2 ways to prevent components from re-rendering.

- Memoize te component using React.memo,
- Using useRef,

## 5 - What is a fragment and why do we need it? Give an example where it might break my app.

A Fragment is a wrapper that lets a component return several sibling elements without adding an extra <div> (or other tag) to the real DOM.

## 6 - Give 3 examples of the HOC pattern.

- connect() (Redux)
  Gives the component direct access to pieces of the Redux store and a way to send actions—without passing everything through props manually.

- withRouter() (React-Router v5)
  Adds easy-to-use props like history.push() and the current URL, so the component can read the route or navigate, even if it’s deep in the tree.

- withErrorBoundary() (react-error-boundary)
  Wraps the component in a safety net. If the child crashes while rendering, the app shows a fallback UI instead of the whole page blowing up.

## 7 - What's the difference in handling exceptions in promises, callbacks and async…await?

- Callbacks: handle and passcthe error "manually" with if (err) everywhere.

- Promises: Call .catch() once; any error inside the chain lands there.

- Async/await: Write try/catch around the await calls, just like normal try/catch for sync code.

## 8 - How many arguments does setState take and why is it async.

- setState can take two arguments,
- React batches several setState calls together to do one re-render instead of many.

## 9 - List the steps needed to migrate a Class to Function Component.

- Make a function instead of a class: function MyComp(props) { … }.
- Delete constructor, super, and every this. prefix.
- Swap this.state / this.setState for const [state, setState] = useState(...).
- Turn lifecycle methods into useEffect hooks:
- mount → useEffect(() => { … }, [])
- update → useEffect(() => { … })
- unmount → useEffect(() => { return () => { … }; }, [])
- Remove .bind(this); handlers are regular functions inside the component.
- Move the JSX from render() into the function’s return (…).
- Use useMemo / useCallback if you need memoisation.
- Keep the same props interface and export the function.

## 10 - List a few ways styles can be used with components.

- Plain CSS file,
- CSS Modules,
- CSS-in-JS library: e.g styled - components (my favorite),

## 11 - How to render an HTML string coming from the server

- Render in a sandboxed,
- Parse HTML → React elements with html-react-parser or html-to-react.
