import React, { useState } from "react";
import {
  useCreatedGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import { GenreForm } from "../../components/GenreForm";
import { Modal } from "../../components/Modal";

export const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectionGenre, setSelectionGenre] = useState(null);
  const [updateGenreName, setUpdateGenre] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreatedGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required.");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectionGenre._id,
        updateGenre: {
          name: updateGenreName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectionGenre(null);
        setUpdateGenre("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectionGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectionGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };
  return (
    <div className="ml-[10rem] flex flex-1 flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>

        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap gap-3">
          {genres?.length > 0 ? (
            genres.map((genre) => (
              <div key={genre._id}>
                <button
                  className="text-teal-500 bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectionGenre(genre);
                    setUpdateGenre(genre.name);
                  }}
                  aria-label={`Edit ${genre.name}`}
                >
                  {genre.name}
                </button>
              </div>
            ))
          ) : (
            <p>No genres available.</p>
          )}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updateGenreName}
            setValue={(value) => setUpdateGenre(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};
