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


interface Transaksi {
    id_trx: number;
    nama_trx: string;
    id_milik: string;
    tgl_trx: string;
    value: number;
    created: string;
    updated: string;
    nama_milik: string;
  }

interface Brand {
    id_milik: number;
    nama_milik: string;
    // other properties...
  }


interface EditProductModalProps {
    rowData :Transaksi;
    brands: Brand[];
    setBrands: React.Dispatch<React.SetStateAction<Brand[]>> | React.Dispatch<React.SetStateAction<never[]>>;
    onAddTransaksi: () => void;
  }


const EditProductModal: FC<EditProductModalProps> = function ({ rowData ,brands,setBrands,onAddTransaksi}) {
    const [isOpen, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
   
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `${token}`,
          };
    
          const response = await axios.get("http://127.0.0.1:8080/api/milik",{
            headers:headers,
          });
          if (response.data) {
            setBrands(response.data);
          } else {
            setBrands([]);
          }
        } catch (error) {
          console.log("Error fetching brands:", error);
        }
      };
    
      fetchBrands();
    }, []);
  
    const [formData, setFormData] = useState({
      id_trx: rowData.id_trx,
      nama_trx: rowData.nama_trx,
      tgl_trx: rowData.tgl_trx,
      id_milik: rowData.id_milik,
      value: rowData.value.toString(),
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
          };
        const requestData = {
            id_trx: formData.id_trx,
            nama_trx: formData.nama_trx,
            tgl_trx: formData.tgl_trx,
            id_milik: parseInt(formData.id_milik),
            value: parseInt(formData.value),
          };    
        const response = await axios.post("/api/edittransaksi", requestData, {
          headers: {  ...headers,"Content-Type": "application/json" },
        });
        console.log("POST request successful", response.data);
         // Close the modal
         handleClose();
  
        onAddTransaksi();
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
                    id="id_trx"
                    name="id_trx"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={formData.id_trx}
                    type="hidden"
                    onChange={handleChange}
                  />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <Label htmlFor="nama_trx">Nama Transaksi</Label>
                  <TextInput
                    id="nama_trx"
                    name="nama_trx"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={formData.nama_trx}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tgl_trx">Tanggal Transaksi</Label>
                  <TextInput
                    id="tgl_trx"
                    name="tgl_trx"
                    placeholder="Electronics"
                    className="mt-1"
                    type="datetime-local"
                    value={formData.tgl_trx}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="id_milik">Milik</Label>
                  <Select
                    id="id_milik"
                    name="id_milik"
                    className="mt-1"
                    value={formData.id_milik}
                    onChange={handleChangeselect}
                  >
                    {/* <option value="">Select a id_milik</option> */}
                    {brands.map((id_milik) => (
                      <option key={id_milik.id_milik} value={id_milik.id_milik}>
                        {id_milik.nama_milik}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <TextInput
                    id="value"
                    name="value"
                    type="number"
                    placeholder="$2300"
                    className="mt-1"
                    value={formData.value}
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

export default EditProductModal;