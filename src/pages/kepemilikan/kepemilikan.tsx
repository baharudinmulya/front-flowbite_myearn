/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    // Button,
    Checkbox,
    Label,
    // Modal,
    Table,
    // Textarea,
    TextInput,
    // Select,
  } from "flowbite-react";
  import type { FC } from "react";
  import {useEffect, useState } from "react";
  // import { FaPlus } from "react-icons/fa";
  import {
    HiCog,
    HiDotsVertical,
    HiExclamationCircle,
    HiHome,
    // HiOutlineExclamationCircle,
    // HiPencilAlt,
    HiTrash,
    // HiUpload,
  } from "react-icons/hi";
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import AddMilikModal from "../../components/kepemilikan/addmilikmodal";
  import EditMilikModal from "../../components/kepemilikan/editmilikmodal";
  import DeleteProductModal from "../../components/product/deleteproductmodal";
  import { Pagination } from "../users/list";
  import axios from "axios";
  
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
  
  
  interface ProductsTableProps {
    refreshTable: boolean;
    brands: Brand[]; 
    setBrands: React.Dispatch<React.SetStateAction<Brand[]>> | React.Dispatch<React.SetStateAction<never[]>>;
    onAddTransaksi: () => void;
  }
  
  const KepemilikanPage: FC = function () {
    const [refreshTable, setRefreshTable] = useState(false);
    const [brands, setBrands] = useState([]);
    const [kepemilikan, setnama_milik] = useState([]);
    useEffect(() => { //brands
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
  
    const handleTableRefresh = () => {
      setRefreshTable((prevState) => !prevState);
    };
    return (
      <NavbarSidebarLayout isFooter={false}>
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item href="#">
                  <div className="flex items-center gap-x-3">
                    <HiHome className="text-xl" />
                    <span className="dark:text-white">Home</span>
                  </div>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/e-commerce/products">
                  Kepemilikan
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>Transaksi</Breadcrumb.Item> */}
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                All Kepemilikan
              </h1>
            </div>
            <div className="block items-center sm:flex">
              <SearchForProducts />
              <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
              <div className="flex w-full items-center sm:justify-end">
                <AddMilikModal onAddTransaksi={handleTableRefresh} brands={brands} Kepemilikan={kepemilikan} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <ProductsTable refreshTable={refreshTable} brands={brands} setBrands={setBrands} onAddTransaksi={handleTableRefresh}/>
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </NavbarSidebarLayout>
    );
  };
  
  const SearchForProducts: FC = function () {
    return (
      <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
        <Label htmlFor="products-search" className="sr-only">
          Search
        </Label>
        <div className="relative mt-1 lg:w-64 xl:w-96">
          <TextInput
            id="products-search"
            name="products-search"
            placeholder="Search for products"
          />
        </div>
      </form>
    );
  };
  
  
  
  const ProductsTable: FC<ProductsTableProps> = function ({ refreshTable,brands,setBrands }) {
  
    const [transaksi_, setTransaksi] = useState<Transaksi[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `${token}`,
          };
  
          const response = await axios.get("http://127.0.0.1:8080/api/milik", {
            headers: headers,
          });
          if (response.data) {
            setTransaksi(response.data);
          } else {
            setTransaksi([]);
          }
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [refreshTable]);
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };
  
        const response = await axios.get("http://127.0.0.1:8080/api/milik", {
          headers: headers,
        });
        if (response.data) {
          setTransaksi(response.data);
        } else {
          setTransaksi([]);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [refreshTable]);
  
    const handleTableRefresh = () => {
      fetchData();
    };
  
    return (
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <span className="sr-only">Toggle selected</span>
            <Checkbox />
          </Table.HeadCell>
          {/* <Table.HeadCell>ID</Table.HeadCell> */}
          {/* <Table.HeadCell>Tanggal Transaksi</Table.HeadCell> */}
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Milik</Table.HeadCell>
          {/* <Table.HeadCell>Value</Table.HeadCell> */}
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {transaksi_.map((transaksi) => (
          <Table.Row 
            key={transaksi.id_trx}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {transaksi.id_milik}
              </div>
              {/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {transaksi.tgl_trx}
              </div> */}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {transaksi.nama_milik}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditMilikModal rowData={transaksi} onAddAkun={handleTableRefresh} />
                <DeleteProductModal />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    );
  };
  
  export default KepemilikanPage;
  