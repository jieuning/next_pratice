"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  let fruitArr = ["멜론", "수박", "망고", "사과", "파인애플"];

  const [arr, setArr] = useState([...fruitArr]);
  const [selctedValue, setSelectedValue] = useState([]);
  const [value, setValue] = useState("");
  const [addValue, setAddValue] = useState("");
  const [hide, setHide] = useState(true);

  useEffect(() => {
    localStorage.getItem("fruit");
  }, []);

  useEffect(() => {
    localStorage.setItem("fruit", arr);
  }, [arr]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const options = e.target.options;

    setValue(e.target.value);
    setSelectedValue([value]);
  };

  const onChangeAdd = (e) => {
    setAddValue(e.target.value);
  };

  const onClickHide = () => {
    setHide(!hide);
  };

  const onClickAdd = () => {
    const sameFileter = arr.some((fruit) => fruit === addValue);

    if (sameFileter) {
      alert("중복!!");
    } else {
      setArr([...arr, addValue]);
      alert("추가됨~~~");
    }
  };

  const onClickDelete = () => {
    if (value !== undefined) {
      const deleteFilter = arr.filter((fruit) => fruit !== value);
      setArr(deleteFilter);
      alert("삭제됨~~");
    }
  };

  return (
    <div
      className={styles.description}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <button onClick={onClickHide}>
        {hide ? "selected 숨기기" : "selected 보이기"}
      </button>
      <div>
        <br />
        <br />
        {hide && (
          <select
            style={{ width: "250px", padding: "5px" }}
            onChange={onChangeHandler}
          >
            <option defaultValue="none">=== 선택 ===</option>
            {arr.map((fruit, i) => (
              <option key={i} value={fruit}>
                {fruit}
              </option>
            ))}
          </select>
        )}
        <br />
        <br />
        <br />
        <div style={{ fontSize: "18px" }}>선택한 과일 명: {value}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "30px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <div>
          <label htmlFor="add">과일 추가: </label>
          <input
            onChange={onChangeAdd}
            value={addValue}
            type="text"
            name="add"
            style={{ padding: "5px" }}
          />
          <button style={{ marginLeft: "10px" }} onClick={onClickAdd}>
            추가하기
          </button>
        </div>
        <div>
          <span>과일 삭제: </span>
          <select onChange={onChangeHandler} style={{ padding: "5px" }}>
            <option defaultValue="none">=== 선택 ===</option>
            {arr.map((fruit, i) => (
              <option key={i} value={fruit}>
                {fruit}
              </option>
            ))}
          </select>
          <button style={{ marginLeft: "10px" }} onClick={onClickDelete}>
            해당 과일 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
