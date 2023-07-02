import type { FC } from "react";
import {useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import {
    Button,
    Label,
    Modal,
    TextInput,
    Select,
  } from "flowbite-react";


interface Brand {
    id_milik: number;
    nama_milik: string;
    // other properties...
  }
interface Akun {
    id_akun: number;
    nama_akun: string;
    // other properties...
  }

interface AddProductModalProps {
    onAddTransaksi: () => void;
    brands: Brand[];
    setBrands: React.Dispatch<React.SetStateAction<Brand[]>> | React.Dispatch<React.SetStateAction<never[]>>;
    akun: Akun[];
    setAkun: React.Dispatch<React.SetStateAction<Akun[]>> | React.Dispatch<React.SetStateAction<never[]>>;
  }
  

const AddProductModal: FC<AddProductModalProps> = function ({ brands, onAddTransaksi, akun }) {
    const [isOpen, setOpen] = useState(false);
    const [nama_trx, setnama_trx] = useState("");
    const [tgl_trx, settgl_trx] = useState("");
    const [id_milik, setSelectedBrand] = useState("");
    const [id_akun, setSelectedAkun] = useState("");
    const [value, setPrice] = useState("");
    const handleClose = () => {
      setOpen(false);
    };
    const handleAddTransaksi = async () => {
      // Check if all required fields are filled
      if (!nama_trx) {
        alert("Please fill in the transaction name.");
        return;
      }
      
      if (!tgl_trx) {
        alert("Please fill in the transaction date.");
        return;
      }
      
      if (!id_milik) {
        alert("Please fill in the ownership ID.");
        return;
      }
      
      if (!id_akun) {
        alert("Please fill in the account ID.");
        return;
      }
      
      if (!value) {
        alert("Please fill in the value of the transaction.");
        return;
      }
  
      // Create the form data
      const data = {
        nama_trx: nama_trx,
        tgl_trx: tgl_trx,
        id_milik: parseInt(id_milik),
        value: parseInt(value),
        id_akun: parseInt(id_akun)
      };
  
      try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
          };
        const response = await axios.post(
          "http://127.0.0.1:8080/api/addtransaksi",
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
  
        setnama_trx('');
        setSelectedBrand('1'),
        setPrice('0');
  
      } catch (error) {
        alert("Error adding Transaksi:" + error);
      }
    };
  
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
  
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
  
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <FaPlus className="mr-3 text-sm" />
          Add Transaksi
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add Transaksi</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <Label htmlFor="nama_trx">Nama Transaksi</Label>
                  <TextInput
                    id="nama_trx"
                    name="nama_trx"
                    placeholder='Apple iMac 27"'
                    className="mt-1"
                    value={nama_trx}
                  onChange={(e) => setnama_trx(e.target.value)}
                  required
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
                    value={tgl_trx || getCurrentDateTime()}
                    onChange={(e) => settgl_trx(e.target.value)}
                  required
                  />
                </div>
                <div>
                  <Label htmlFor="id_milik">Milik</Label>
                  <Select
                    id="id_milik"
                    name="id_milik"
                    className="mt-1"
                    value={id_milik}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">Select a id_milik</option>
                    {brands.map((id_milik) => (
                      <option key={id_milik.id_milik} value={id_milik.id_milik}>
                        {id_milik.nama_milik}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="id_akun">Akun</Label>
                  <Select
                    id="id_akun"
                    name="id_akun"
                    className="mt-1"
                    value={id_akun}
                    onChange={(e) => setSelectedAkun(e.target.value)}
                  >
                    <option value="">Select a akun</option>
                    {akun.map((id_akun) => (
                      <option key={id_akun.id_akun} value={id_akun.id_akun}>
                        {id_akun.nama_akun}
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
                    value={value}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={handleAddTransaksi}>
              Add transaksi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default AddProductModal;