import {
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';
import { createProduct } from '../../../redux/actions/admin';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(state => state.product);

  const [name, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [keyFeatures,setKeyFeatures] = useState('');
  const [specification,setSpecification] = useState('');
  const [baseprice, setBasePrice] = useState('');
  const [discountedprice, setDiscountedPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [Availablecolor, setAvailableColor] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories] = useState(['Gear', 'Shoes', 'Helmets']);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');

  const [showVerificationBox, setShowVerificationBox] = useState(false);

 

  const changeImageHandler = e => {
    const files = e.target.files;
    const newSelectedImages = [...selectedImages];
    const newImagePreviews = [...imagePreviews];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        newSelectedImages.push(file);

        // Display only the first 8 images
        setImagePreviews(newImagePreviews.slice(0, 8));
        setSelectedImages(newSelectedImages.slice(0, 8));
      };

      reader.readAsDataURL(file);
    }
  };

  const subcategoriesMap = {
    Gear: [
      'Bat',
      'Batting Gear',
      'WicketKeeping',
      'Protection',
      'Bags',
      'Clothing',
      'Cricket Sets',
      'Accessories',
    ],
    Shoes: ['Bowling', 'Spikes', 'Rubber Studs', 'Accessories'],
    Helmets: ['Titanium', 'Steel', 'Limited Edition', 'Accessories'],
  };

  const subSubcategoriesMap = {
    Bat: ['English Willow', 'Kashmir Willow', 'Tennis', 'Player Edition'],
    'Batting Gear': ['Gloves', 'Leg Guard', 'Inner Gloves'],
    WicketKeeping: ['WGloves', 'WLeg Guard', 'WInner Gloves'],
    Protection: [
      'Thigh Pad',
      'Chest Guard',
      'Arm Guard',
      'Abdominal Guard',
      'Inner ThighPad',
    ],
    Bags: ['Kitbags', 'Wheelie', 'Duffle', 'Backpack', 'Bat Cover'],
    Clothing: [
      'On-Field',
      'Base Layer',
      ' Athletic Supporter',
      'Socks',
      'Caps & Hats',
      'WristBand',
    ],
    'Cricket Sets': ['English Willow Kit', 'Kashmir Willow Kit', 'Plastic Kit'],
    Accessories: [
      'Ball',
      'SunGlass',
      'Bat Grips',
      'Bat Care',
      'Stumps',
      'Other',
    ],
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setSubcategories(subcategoriesMap[category] || []);
    setSelectedSubcategory(''); // Reset selected subcategory when the category changes
    setSubSubcategories([]); // Reset subsubcategories when the category changes
    setSelectedSubSubcategory(''); // Reset selected subsubcategory when the category changes
  };

  const handleSubcategoryChange = subcategory => {
    setSelectedSubcategory(subcategory);
    if (selectedCategory === 'Gear') {
      setSubSubcategories(subSubcategoriesMap[subcategory] || []);
    } else {
      setSubSubcategories([]); // Reset subsubcategories if the category is not 'Gear'
    }
    setSelectedSubSubcategory(''); // Reset selected subsubcategory when the subcategory changes
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('description', description);
    myForm.append('keyFeatures', keyFeatures);
    myForm.append('specification', specification);
    myForm.append('baseprice', baseprice);
    myForm.append('discountedprice', discountedprice);
    myForm.append('stock', stock);
    myForm.append('size', size);
    myForm.append('color', color);
    myForm.append('Availablecolor', Availablecolor);
    for (const image of selectedImages) {
      myForm.append('images', image);
    }
    // Append selected category and subcategories
    myForm.append('category', selectedCategory);
    myForm.append('sub_category', selectedSubcategory);
    if (selectedCategory === 'Gear') {
      myForm.append('sub_category2', selectedSubSubcategory);
    }
    dispatch(createProduct(myForm))

  };

  const verifyData = (e) => {
    e.preventDefault();
    setShowVerificationBox(true);
  };


  const handleVerificationBoxToggle = () => {
    setShowVerificationBox(!showVerificationBox);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate("/products")

    }
  }, [dispatch, error, message,navigate]);

  return (
    <>
      <MetaData title="Admin--Create Product" />
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Container py="16">
          <form onSubmit={handleSubmit}>
            <Heading
              textTransform={'uppercase'}
              children="Create Product"
              my="16"
              textAlign={['center', 'left']}
            />

            <VStack m="auto" spacing={'8'}>
              <div
                style={{
                  overflowX: 'auto', // Add overflow property for horizontal scrolling
                  maxWidth: '100%', // Adjust as needed
                }}
              >
                <HStack spacing={'8'}>
                  {imagePreviews.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      boxSize="64"
                      objectFit={'contain'}
                    />
                  ))}
                </HStack>
              </div>
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={'file'}
                multiple
                focusBorderColor="purple.500"
                css={{
                  '&::file-selector-button': {
                    ...fileUploadCss,
                    color: 'purple',
                  },
                }}
                onChange={changeImageHandler}
              />

              <Input
                value={name}
                onChange={e => setProductName(e.target.value)}
                placeholder="Product Name"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                focusBorderColor="purple.500"
              />
              <Textarea
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                placeholder="Product Key Features"
                focusBorderColor="purple.500"
              />
              <Textarea
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                placeholder="Product Specification"
                focusBorderColor="purple.500"
              />
              <Input
                value={baseprice}
                onChange={e => setBasePrice(e.target.value)}
                placeholder="Base Price"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={discountedprice}
                onChange={e => setDiscountedPrice(e.target.value)}
                placeholder="Discounted Price"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={stock}
                onChange={e => setStock(e.target.value)}
                placeholder="Stock"
                type={'text'}
                focusBorderColor="purple.500"
              />

              <Select
                focusBorderColor="purple.500"
                value={selectedCategory}
                onChange={e => handleCategoryChange(e.target.value)}
              >
                <option value="">Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>

              <Select
                focusBorderColor="purple.500"
                value={selectedSubcategory}
                onChange={e => handleSubcategoryChange(e.target.value)}
                isDisabled={!selectedCategory} // Disable the subcategory select until a category is selected
              >
                <option value="">Subcategory</option>
                {subcategories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>

              {selectedCategory === 'Gear' && (
                <Select
                  focusBorderColor="purple.500"
                  value={selectedSubSubcategory}
                  onChange={e => setSelectedSubSubcategory(e.target.value)}
                  isDisabled={!selectedSubcategory} // Disable the subsubcategory select until a subcategory is selected
                >
                  <option value="">SubSubcategory</option>
                  {subSubcategories.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              )}

              <Input
                value={size}
                onChange={e => setSize(e.target.value)}
                placeholder="Size/Type"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={color}
                onChange={e => setColor(e.target.value)}
                placeholder="Color"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={Availablecolor}
                onChange={e => setAvailableColor(e.target.value)}
                placeholder="Available Color"
                type={'text'}
                focusBorderColor="purple.500"
              />

              <Button w="full" isLoading={loading} colorScheme={'purple'} type="submit">
                Create
              </Button>
              <Button w="full" colorScheme={'yellow'} type="submit" onClick={verifyData}>
                Verify
              </Button>
            </VStack>
          </form>
        </Container>

        <Sidebar />

        {showVerificationBox && (
          <Container
            position="fixed"
            top="0"
            right="0"
            bottom="0"
            p="4"
            bgColor="white"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <VStack spacing={4}>
              <Heading as="h2" size="md">
                Verification Details
              </Heading>
              <div>
                <strong>Product Name:</strong> {name}
              </div>
              <div>
                <strong>Description:</strong> {description}
              </div>
              <div>
                <strong>Base Price:</strong> {baseprice}
              </div> 
              <div>
                <strong>Discounted Price:</strong> {discountedprice}
              </div> 
              <div>
                <strong>Stock:</strong> {stock}
              </div>
              <div>
                <strong>Category:</strong> {selectedCategory}
              </div>
              <div>
                <strong>Subcategory:</strong> {selectedSubcategory}
              </div>
              {selectedCategory === 'Gear' && (
                <div>
                  <strong>SubSubcategory:</strong> {selectedSubSubcategory}
                </div>
              )}
              <div>
                <strong>Size/Type:</strong> {size}
              </div>
              <div>
                <strong>Color:</strong> {color}
              </div>
              <div>
                <strong>Available Color:</strong> {Availablecolor}
              </div>
              <Button onClick={handleVerificationBoxToggle}>Close</Button>
            </VStack>
          </Container>
        )}
      </Grid>
    </>
  );
};

export default CreateProduct;
