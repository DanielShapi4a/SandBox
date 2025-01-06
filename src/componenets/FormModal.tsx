import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDuck } from "../reducers/duckReducer/duckSlice";
import { AppDispatch } from "../store";

interface FormModalProps {
  setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMapOpen: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  setIsMapOpen,
  isMapOpen,
}) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsFormValid(name.trim() !== "" && latitude !== 0 && longitude !== 0);
  }, [name, latitude, longitude]);

  const handleAddDuck = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addDuck({ name, latitude, longitude }));
    setIsMapOpen(false);
    navigate("/");
  };

  return (
    <form onSubmit={handleAddDuck}>
      <Dialog open={isMapOpen} onClose={() => setIsMapOpen(false)}>
        <DialogTitle sx={{ mt: 1, ml: 1 }}>Add a Duck🦆</DialogTitle>
        <DialogContent>
          <TextField
            label="Duck Name"
            fullWidth
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            required
            error={name === ""}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Latitude"
            fullWidth
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            required
            error={latitude === 0}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Longitude"
            fullWidth
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            required
            error={longitude === 0}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsMapOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={!isFormValid}
            onClick={handleAddDuck}
          >
            Add Duck
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
