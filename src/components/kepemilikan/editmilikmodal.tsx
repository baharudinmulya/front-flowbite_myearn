import type { FC } from "react";
import {useState ,useEffect} from "react";
import axios from "axios";
import {
    HiPencilAlt,
  } from "react-icons/hi";
// import { FaPlus } from "react-icons/fa";

import {
    Button,
    Label,
    Modal,
    TextInput,
    Select,
  } from "flowbite-react";


interface Milik {
    id_milik: number;
    nama_milik : string;
  }

interface Brand {
    id_milik: number;
    nama_milik: string;
    // other properties...
  }


interface EditAkunModalProps {
    rowData :Milik;
    onAddAkun: () => void;
  }


const EditMilikModal: FC<EditAkunModalProps> = function ({ rowData , onAddAkun}) {
    const [isOpen, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
  
    const [formData, setFormData] = useState({
        id_milik: rowData.id_milik,
        nama_milik: rowData.nama_milik,
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
          };
        const requestData = {
            id_milik: formData.id_milik,
            nama_milik: formData.nama_milik,
          };    
        const response = await axios.post("/api/editmilik", requestData, {
          headers: {  ...headers,"Content-Type": "application/json" },
        });
        console.log("POST request successful", response.data);
         // Close the modal
         handleClose();
  
         onAddAkun();
        // Add your desired logic for success, e.g., closing the modal, displaying a success message, etc.
      } catch (error) {
        console.error("Error:", error);
        // Add your desired logic for error handling, e.g., displaying an error message, etc.
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleChangeselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Handle select change
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <HiPencilAlt className="mr-2 text-lg" />
          Edit
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit Transaksi</strong>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="id_milik"
                    name="id_milik"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={formData.id_milik}
                    type="hidden"
                    onChange={handleChange}
                  />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <Label htmlFor="nama_milik">Nama Kepemilikan</Label>
                  <TextInput
                    id="nama_milik"
                    name="nama_milik"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={formData.nama_milik}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button color="primary" type="submit">
              Save all
            </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default EditMilikModal;