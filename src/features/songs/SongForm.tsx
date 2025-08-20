import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { addSong, updateSong } from "./SongSlice";
import { Song, NewSong } from "../../types/song";
import styled from "@emotion/styled";
import { space, layout, color, typography, flexbox } from "styled-system";

//  Styled Components
const PageWrapper = styled("div")(
  {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  space,
  layout
);

const FormCard = styled("div")(
  {
    backgroundColor: "#181818",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    color: "white",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
  },
  layout,
  space,
  color
);

const Title = styled("h2")(
  {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#1DB954",
  },
  typography
);

const Input = styled("input")(
  {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    backgroundColor: "#222",
    border: "1px solid #333",
    color: "white",
    fontSize: "16px",
    transition: "border-color 0.2s ease-in-out",
    outline: "none",
    marginBottom: "20px",
    "&:focus": {
      borderColor: "#1DB954",
    },
    "&::placeholder": {
      color: "#aaa",
    },
  },
  space,
  layout,
  color,
  typography
);

const Button = styled("button")(
  {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#1DB954",
    color: "#000",
    transition: "background 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#1ed760",
    },
  },
  layout,
  space,
  color,
  typography
);

// Component
interface SongFormProps {
  editId?: string;
  onFinish: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ editId, onFinish }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.songs);

  const [form, setForm] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    if (editId) {
      const song = list.find((s) => s._id === editId);
      if (song) {
        const { _id, ...rest } = song;
        setForm(rest);
      }
    }
  }, [editId, list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(updateSong({ ...form, _id: editId } as Song));
    } else {
      dispatch(addSong(form));
    }
    setForm({ title: "", artist: "", album: "", genre: "" });
    onFinish();
  };

  return (
    <PageWrapper py={6}>
      <FormCard>
        <Title>{editId ? "✏️ Edit Song" : "➕ Add New Song"}</Title>

        <form>
          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="artist"
            placeholder="Artist"
            value={form.artist}
            onChange={handleChange}
          />
          <Input
            name="album"
            placeholder="Album"
            value={form.album}
            onChange={handleChange}
          />
          <Input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />

          <Button type="button" onClick={handleSubmit}>
            {editId ? "Update Song" : "Add Song"}
          </Button>
        </form>
      </FormCard>
    </PageWrapper>
  );
};

export default SongForm;
