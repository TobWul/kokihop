import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { RecipeContext } from "../../../context/recipeContext";
import Button from "../../DS/Button/Button";
import Icon from "../../DS/Icon/Icon";
import Input from "../../DS/Input/Input";
import Modal from "../../DS/Modal/Modal";
import { Heading3, Subtitle1, Subtitle2 } from "../../DS/Typography/Typography";
import styles from "./AddCategory.module.scss";

const AddCategory = ({}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const { refetch, bookId } = useContext(RecipeContext);
  const [addNewCategory, { loading }] = useMutation(ADD_NEW_CATEGORY, {
    update() {
      refetch();
      setModalOpen(false);
      setNewCategoryName("");
    },
    onError(err) {
      console.error(err);
    },
    variables: { name: newCategoryName, bookId },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addNewCategory();
  };

  return (
    <>
      <div className={styles.addCategoryWrapper}>
        <button
          className={styles.addCategoryButton}
          type="submit"
          onClick={() => setModalOpen(true)}
        >
          <Icon icon="addCircle" />
          Legg til ny kategori
        </button>
      </div>
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={onSubmit}>
          <Subtitle2>Legg til ny kategori:</Subtitle2>
          <br />
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Kategorinavn"
          />
          <Button
            loading={loading}
            type="submit"
            disabled={newCategoryName.trim() === ""}
          >
            Legg til
          </Button>
        </form>
      </Modal>
    </>
  );
};

const ADD_NEW_CATEGORY = gql`
  mutation AddNewCategory($name: String!, $bookId: ID!) {
    addCategory(name: $name, bookId: $bookId) {
      name
      recipes
    }
  }
`;

export default AddCategory;
