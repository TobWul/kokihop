import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../../Routes/Router";
import Button from "../../DS/Button/Button";
import Input from "../../DS/Input/Input";
import { Body1, Subtitle1, Subtitle2 } from "../../DS/Typography/Typography";
import styles from "./SaveToBook.module.scss";

const SaveToBook = ({ recipeId, userId, books }) => {
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const save = () => {
    history.push({
      pathname: `/rediger-oppskrift/${recipeId}`,
      state: {
        userId,
        bookId: books[selectedBook].id,
        categoryId: books[selectedBook].categories[selectedCategory].id,
      },
    });
  };
  const onChangeBook = (e) => {
    setSelectedBook(e.target.value);
  };
  const onChangeCategory = (e) => setSelectedCategory(e.target.value);
  return books ? (
    <div className={styles.wrapper}>
      <div>
        <Subtitle2>Lagre denne oppskriften i din bok:</Subtitle2>
        <div>
          {books && (
            <Input
              value={selectedBook}
              onChange={onChangeBook}
              options={books.map((book, index) => ({
                value: index,
                name: book.name,
              }))}
            />
          )}
          {books && books[selectedBook] && (
            <Input
              onChange={onChangeCategory}
              options={books[selectedBook].categories.map(
                (category, index) => ({
                  value: index,
                  name: category.name,
                })
              )}
            />
          )}
        </div>
      </div>
      <Button onClick={save}>Lagre</Button>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div>
        <Subtitle2>Opprett en kokebok for å lagre denne oppskriften</Subtitle2>
        <Body1>
          Har du allerede en?{" "}
          <Link
            to={{ pathname: ROUTES.LOGIN, state: { from: location.pathname } }}
          >
            Logg inn
          </Link>
        </Body1>
      </div>
      <Button to={ROUTES.REGISTER}>Opprett bok</Button>
    </div>
  );
};

export default SaveToBook;
