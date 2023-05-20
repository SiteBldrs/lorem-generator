import React from "react";
import data from "./data";

export interface IApp {}

const App: React.FC<IApp> = (): React.ReactElement => {
  const [count, setCount] = React.useState<string>("0");
  const [text, setText] = React.useState<Array<string>>([]);
  const [msg, setMsg] = React.useState<string>("copy");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let amount: number = parseInt(count);

    if (parseInt(count) <= 0) {
      amount = 1;
    }

    if (parseInt(count)) {
      amount = parseInt(count);
    }

    setText(data.slice(0, amount));
  };

  const copyTheGeneratedParagraphs = (): void => {
    navigator.clipboard.writeText(text.join(" "));
    setMsg("copied");
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setMsg("copy");
      setText([]);
      setCount("0");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [msg]);

  return (
    <section>
      <h1>paragraph generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form_control">
          <label htmlFor="amount">paragraphs:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="form_control">
          <button>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text"> Generate</span>
          </button>
          {text.length > 0 && (
            <button type="button" onClick={() => copyTheGeneratedParagraphs()}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">{msg}</span>
            </button>
          )}
        </div>
      </form>
      <article>
        {text.map((item, index) => (
          <div key={index + 1}>
            <p>{item}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default App;
