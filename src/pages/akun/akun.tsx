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
  import AddAkunModal from "../../components/akun/addakunmodal";
  import EditAkunModal from "../../components/akun/editakunmodal";
  import DeleteAkunModal from "../../components/akun/deleteakunmodal";
  import { Pagination } from "../users/list";
  import axios from "axios";
  
  interface Akun {
    id_akun: number;
    nama_akun: string;
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
  
  const AkunPage: FC = function () {
    const [refreshTable, setRefreshTable] = useState(false);
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
                <Breadcrumb.Item href="/akun">
                  Akun
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>Transaksi</Breadcrumb.Item> */}
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                All Akun
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
                <AddAkunModal onAddTransaksi={handleTableRefresh} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <ProductsTable refreshTable={refreshTable} />
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
  
    const [akun_, setAkun] = useState<Akun[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `${token}`,
          };
  
          const response = await axios.get("http://127.0.0.1:8080/api/akun", {
            headers: headers,
          });
          if (response.data) {
            setAkun(response.data);
          } else {
            setAkun([]);
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
  
        const response = await axios.get("http://127.0.0.1:8080/api/akun", {
          headers: headers,
        });
        if (response.data) {
          setAkun(response.data);
        } else {
          setAkun([]);
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
          <Table.HeadCell>ID</Table.HeadCell>
          {/* <Table.HeadCell>Tanggal Transaksi</Table.HeadCell> */}
          <Table.HeadCell>Nama Akun</Table.HeadCell>
          {/* <Table.HeadCell>Milik</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell> */}
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {akun_.map((akun) => (
          <Table.Row 
            key={akun.id_akun}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {akun.id_akun}
              </div>
              {/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {transaksi.tgl_trx}
              </div> */}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {akun.nama_akun}
              </div>
              {/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {transaksi.tgl_trx}
              </div> */}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditAkunModal rowData={akun} onAddAkun={handleTableRefresh} />
                <DeleteAkunModal />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    );
  };
  
  export default AkunPage;
  