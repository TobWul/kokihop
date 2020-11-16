import React, { useContext, useState } from "react";
import styles from "./Editor.module.scss";
import ReactQuill, { Quill } from "react-quill";
import "./QuillOverrides.scss";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/DS/Button/Button";
import Icon from "../../components/DS/Icon/Icon";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { RecipeContext } from "../../context/recipeContext";
import { ROUTES } from "../../Routes/Router";
import sanitize from "sanitize-html";

const Toolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold">
      <Icon icon="bold" size="18" />
    </button>
    <button className="ql-italic">
      <Icon icon="italic" size="18" />
    </button>
    <button className="ql-list">
      <Icon icon="list" size="18" />
    </button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
  </div>
);

const Editor = () => {
  const [value, setValue] = useState("");
  const history = useHistory();
  const { recipeId } = useParams();
  const { bookId, categoryId, refetch } = useContext(RecipeContext);

  if (!recipeId && !categoryId) history.goBack();

  const { error, loading } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipeId },
    onCompleted: (data) => {
      setValue(data.getRecipe.content);
    },
    onError: (err) => console.log(err),
    skip: !recipeId,
  });

  const navigate = () => {
    history.push(`/bok/${bookId}`);
  };

  const [save] = useMutation(SAVE, {
    update() {
      refetch().then(() => {
        navigate();
      });
    },
    onError(err) {
      console.error(err);
    },
    variables: { content: value, bookId, categoryId },
  });
  const [update] = useMutation(UPDATE, {
    update() {
      navigate();
    },
    onError(err) {
      console.error(err);
    },
    variables: { content: value, recipeId },
  });

  // Icon reset
  const icons = Quill.import("ui/icons");
  icons.bold = null;
  icons.italic = null;
  icons.list = null;

  const submit = () => {
    console.log("Saving...");
    if (recipeId) update();
    else if (categoryId) save();
    else console.error("Missing Recipe ID or Category ID");
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Toolbar />
        <div>
          <Button onClick={submit}>Lagre</Button>
        </div>
      </div>
      <div className={styles.editor}>
        <ReactQuill
          theme="snow"
          value={loading && recipeId ? "Loading..." : value}
          onChange={setValue}
          placeholder="Ny oppskrift..."
          modules={{ toolbar: "#toolbar" }}
        />
      </div>
      {sanitize(value)}
    </div>
  );
};

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    getRecipe(recipeId: $recipeId) {
      id
      content
      updatedAt
    }
  }
`;

const SAVE = gql`
  mutation NewRecipe($content: String!, $bookId: ID!, $categoryId: ID!) {
    newRecipe(
      recipeInput: {
        content: $content
        bookId: $bookId
        categoryId: $categoryId
      }
    ) {
      id
    }
  }
`;

const UPDATE = gql`
  mutation UpdateRecipe($content: String!, $recipeId: ID!) {
    updateRecipe(
      updateRecipeInput: { content: $content, recipeId: $recipeId }
    ) {
      id
    }
  }
`;

export default Editor;
