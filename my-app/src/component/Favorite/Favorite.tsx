
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import {useNavigate} from "react-router-dom"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Heading,Textarea,Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

interface DataItem {
  selectedPackage: string | null;
  textValue: string | null;
}

const Favorite: React.FC = () => {
  const [storedData, setStoredData] = useState<DataItem[]>([]);
  const [selectedPackageToDelete, setSelectedPackageToDelete] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<DataItem | null>(null);
  const [editedTextValue, setEditedTextValue] = useState<string>('');
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const Navigate=useNavigate()

  // Function to handle opening the delete confirmation modal
  const handleOpenDeleteModal = (packageName: string | null) => {
    setSelectedPackageToDelete(packageName);
   
    onDeleteModalOpen();
  };

  const handleOpenEditModal = (item: DataItem) => {
    setSelectedPackage(item);
    setEditedTextValue(item.textValue || ''); // Set the initial value to the current textValue
    onEditModalOpen();
  };
  const handleEditPackage = () => {
    if (selectedPackage) {
      const updatedData = storedData.map(item =>
        item.selectedPackage === selectedPackage.selectedPackage
          ? { ...item, textValue: editedTextValue }
          : item
      );
      setStoredData(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));
      onEditModalClose();
    }
  };
  // Function to handle deleting a package from local storage
  const handleDeletePackage = () => {
    if (selectedPackageToDelete) {
      // Filter out the selected package and update local storage
      const updatedData = storedData.filter(item => item.selectedPackage !== selectedPackageToDelete);
      setStoredData(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));

      // Close the delete modal
      onDeleteModalClose();
    }
  };

  React.useEffect(() => {
    const storedDataString = localStorage.getItem('data');
    if (storedDataString) {
      setStoredData(JSON.parse(storedDataString));
    }
  }, []);

  return (
    <>
    <Box display={"flex"} justifyContent={"space-around"} mb="20px" >
      <Heading>Welcome to Favorite Packages</Heading>
      <Button maxW={"10p%"} color={"blue"} onClick={()=>Navigate("/add")}>Add Fav</Button>
      </Box>
      <Box maxW={"50%"} m={"auto"}>
      {storedData.length > 0 ? (
        <Table >
          <Thead>
            <Tr>
              <Th>Package Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {storedData.map((item, index) => (
              <Tr key={index}>
                <Td>{item.selectedPackage}</Td>
                <Td display={"flex"} justifyContent={"space-around"}>
                  <FaEye
                    title="View"
                    onClick={() => {
                      // Set the selected item for the view modal
                      setSelectedPackageToDelete(item.selectedPackage);
                      // Open the view modal
                      onViewModalOpen();
                    }}
                    className="cursor-pointer mr-4"
                  />
                  <Modal isOpen={isViewModalOpen} onClose={onViewModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Package details</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Box>Package Name:<Heading>{item.selectedPackage}</Heading> </Box>
                        <Box>Why Choose:<Heading>{item.textValue}</Heading> </Box>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                  <FaEdit title="Edit" className="cursor-pointer mr-4"  onClick={() => handleOpenEditModal(item)}/>
                  <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Package</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                value={editedTextValue}
                onChange={(e) => setEditedTextValue(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onEditModalClose}>
                Cancel
              </Button>
              <Button variant='ghost' onClick={handleEditPackage}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
                  <FaTrash
                    title="Delete"
                    className="cursor-pointer mr-4"
                    onClick={() => handleOpenDeleteModal(item.selectedPackage)}
                  />
                  <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Delete Package</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure you want to delete the package?
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onDeleteModalClose}>
                          Cancel
                        </Button>
                        <Button variant='ghost' onClick={handleDeletePackage}>Yes</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>No favorite packages yet.</p>
      )}
    </Box>
    </>
  );
};

export default Favorite;
