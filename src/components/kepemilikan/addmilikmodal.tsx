import type { FC } from "react";
import {useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import {
    Button,
    Label,
    Modal,
    TextInput,
  } from "flowbite-react";


interface Brand {
    id_milik: number;
    nama_milik: string;
    // other properties...
  }
interface Kepemilikan {
    id_milik: number;
    nama_milik: string;
    // other properties...
  }

interface AddProductModalProps {
    onAddTransaksi: () => void;
    brands: Brand[];
    setBrands: React.Dispatch<React.SetStateAction<Brand[]>> | React.Dispatch<React.SetStateAction<never[]>>;
    Kepemilikan: Kepemilikan[];
    setKepemilikan: React.Dispatch<React.SetStateAction<Kepemilikan[]>> | React.Dispatch<React.SetStateAction<never[]>>;
  }
  

const AddMilikModal: FC<AddProductModalProps> = function ({ brands, onAddTransaksi, Kepemilikan }) {
    const [isOpen, setOpen] = useState(false);
    const [nama_milik, setnama_milik] = useState("");
    const handleClose = () => {
      setOpen(false);
    };
    const handleAddTransaksi = async () => {
      // Check if all required fields are filled
      if (!nama_milik ) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Create the form data
      const data = {
        nama_milik: nama_milik,
      };
  
      try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
          };
        const response = await axios.post(
          "http://127.0.0.1:8080/api/addmilik",
          data, {
            headers: {
              ...headers,
              "Content-Type": "application/json", // Set the Content-Type header
            },
          }
        );
  
        // Handle the response and perform any necessary actions
        alert("Add Transaksi response:" + response);
  
        // Close the modal
        handleClose();
  
        // Call the callback function to trigger table refresh
        onAddTransaksi();
  
        setnama_milik('');
      } catch (error) {
        alert("Error adding Transaksi:" + error);
      }
    };

  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <FaPlus className="mr-3 text-sm" />
          Add Kepemilikan
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add Kepemilikan</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <Label htmlFor="nama_trx">Nama Milik</Label>
                  <TextInput
                    id="nama_milik"
                    name="nama_milik"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={nama_milik}
                  onChange={(e) => setnama_milik(e.target.value)}
                  required
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={handleAddTransaksi}>
              Add Milik
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default AddMilikModal;