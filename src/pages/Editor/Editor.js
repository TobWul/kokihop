import React, { useContext, useState } from "react";
import styles from "./Editor.module.scss";
import ReactQuill, { Quill } from "react-quill";
import "./QuillOverrides.scss";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/DS/Button/Button";
import Icon from "../../components/DS/Icon/Icon";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RecipeContext } from "../../context/recipeContext";
import { AuthContext } from "../../context/authContext";
import { addEndingS } from "../../lib/helpers";

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
  const [title, setTitle] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { recipeId } = useParams();
  let {
    book,
    bookId,
    categoryId,
    refetch,
    setCategoryId,
    setBookId,
  } = useContext(RecipeContext);
  const { user } = useContext(AuthContext);
  const userId = location && location.state && location.state.userId;

  if (!bookId) {
    setBookId(location.state.bookId);
    setCategoryId(location.state.categoryId);
  }

  const isOthersRecipe = userId && userId !== user.id;

  const { error, loading } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipeId },
    onCompleted: (data) => {
      setValue(data.getRecipe.content);
      setTitle(data.getRecipe.title);
    },
    onError: (err) => console.log(err),
    skip: !recipeId,
  });

  useQuery(GET_USERNAME, {
    variables: { userId },
    onCompleted: (data) =>
      data &&
      setTitle(addEndingS(data.getUsername.split(" ")[0]) + " " + title),
    skip: !title,
  });

  const navigate = () => {
    history.push(`/bok/${bookId}`);
  };

  const [save, { loading: saveLoading }] = useMutation(SAVE, {
    update() {
      refetch().then(() => {
        navigate();
      });
    },
    onError(err) {
      console.error(err);
    },
    variables: { title, content: value, bookId, categoryId },
  });
  const [update, { loading: updateLoading }] = useMutation(UPDATE, {
    update() {
      navigate();
    },
    onError(err) {
      console.error(err);
    },
    variables: { title, content: value, recipeId },
  });

  // Icon reset
  const icons = Quill.import("ui/icons");
  icons.bold = null;
  icons.italic = null;
  icons.list = null;

  const submit = () => {
    console.log("Saving...");
    if (recipeId && !isOthersRecipe) update();
    else if (categoryId) save();
    else console.error("Missing Recipe ID or Category ID");
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Toolbar />
        <div>
          <Button
            loading={saveLoading || updateLoading}
            onClick={submit}
            disabled={value.trim("") === "" || title.trim("") === ""}
          >
            Lagre
          </Button>
        </div>
      </div>
      <div className={styles.editor}>
        <input
          className={styles.titleField}
          type="text"
          name="title"
          placeholder="Tittel..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={loading && recipeId ? "Loading..." : value}
          onChange={setValue}
          placeholder="Skriv inn oppskriften her..."
          modules={{ toolbar: "#toolbar" }}
        />
      </div>
    </div>
  );
};

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    getRecipe(recipeId: $recipeId) {
      id
      title
      content
      updatedAt
    }
  }
`;

const GET_USERNAME = gql`
  query GetUsername($userId: ID!) {
    getUsername(userId: $userId)
  }
`;

const SAVE = gql`
  mutation NewRecipe(
    $title: String!
    $content: String!
    $bookId: ID!
    $categoryId: ID!
  ) {
    newRecipe(
      recipeInput: {
        title: $title
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
  mutation UpdateRecipe($title: String!, $content: String!, $recipeId: ID!) {
    updateRecipe(
      updateRecipeInput: {
        title: $title
        content: $content
        recipeId: $recipeId
      }
    ) {
      id
    }
  }
`;

export default Editor;
