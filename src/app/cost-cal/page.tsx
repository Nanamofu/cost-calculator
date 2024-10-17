"use client";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [text, setText] = useState<string>(''); // アイテム名
  const [number1, setNumber1] = useState<number | ''>(''); // 価格
  const [number2, setNumber2] = useState<number | ''>(''); // 内容量
  const [item, setItem] = useState<string[]>([]); // アイテムリスト

  // テキストの変更を処理する関数
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 1つ目の数値の変更を処理する関数
  const changeNumber1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber1(value === '' ? '' : parseFloat(value));
  };

  // 2つ目の数値の変更を処理する関数
  const changeNumber2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber2(value === '' ? '' : parseFloat(value));
  };

  // Itemを追加する関数
  const addItem = () => {
    if (text.trim() === '' || number1 === '' || number2 === '') return; // 空のItemを追加しない

    // 数値がゼロで割ることを防止
    if (number2 === 0) {
      alert("ゼロで割ることはできません。");
      return;
    }

    // 割り算を行う
    const result = number1 / number2;

    // 計算結果をItemに追加
    const newitem = [`${text}: ${result}`, ...item];
    setItem(newitem);

    // 入力フィールドをリセット
    setText('');
    setNumber1('');
    setNumber2('');
  };

  // Itemを削除する関数
  const deleteItem = (index: number) => {
    const newitem = item.filter((_, i) => i !== index); // 削除されたItem以外を保持
    setItem(newitem);
  };

  return (
    <main>
      <div>
        <p>作成者：ななりん</p>
        <h1>コスト計算機</h1>
        <p>アイテム名、価格、内容量を入力し計算ボタンを押してください。</p>
        <input 
          type="text" 
          value={text} 
          onChange={changeText} 
          placeholder="アイテム" 
        />
        <input 
          type="number" 
          value={number1 === '' ? '' : number1} 
          onChange={changeNumber1} 
          placeholder="価格(数値のみ)" 
        />
        <input 
          type="number" 
          value={number2 === '' ? '' : number2} 
          onChange={changeNumber2} 
          placeholder="内容量(数値のみ)" 
        />
        <button onClick={addItem} disabled={text.trim() === '' || number1 === '' || number2 === ''}>計算</button>
      </div>
      <div>
        <ul>
          {item.map((item, index) => (
            <li key={index}>
              <p>{item}</p>
              <button onClick={() => deleteItem(index)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;