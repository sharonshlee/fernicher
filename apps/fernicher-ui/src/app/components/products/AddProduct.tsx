import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useViewport from '../../hooks/useViewport';
import { map } from 'lodash';

export function AddProduct(props: { open: boolean; handleClose: any }) {
  const { open, handleClose } = props;
  const {
    viewport: { latitude, longitude },
  } = useViewport();

  const defaultProductValues = {
    name: '',
    categoryCode: '',
    image: null,
    condition: '',
    description: '',
    productLocation: [latitude, longitude],
  };
  const [product, setProduct] = useState<{
    image: FileList | null;
    categoryCode: string;
    name: string;
    condition: string;
    description?: string;
    productLocation: number[];
  }>(defaultProductValues);
  class CategoryDto {
    name!: string;
    code!: string;
  }
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  useEffect(() => {
    axios
      .post<CategoryDto[]>('/api/categories')
      .then((res) => setCategories(res.data));
  }, []);
  return (
    <div>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>
          Now Everyone Can Save The Climate. <br />
          Donate A Furniture!
        </DialogTitle>
        <DialogContent>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files })
              }
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Files
            </Button>
          </label>
          <div className="file-name">
            {product.image && product.image.length > 0 && product.image[0].name}
          </div>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Photos"
            type="image"
            fullWidth
            variant="standard"            
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            value={product.image}
          /> */}
          <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
            <InputLabel id="category">Furniture Category</InputLabel>
            <Select
              labelId="category"
              id="category_select"
              onChange={(e) =>
                setProduct({ ...product, categoryCode: e.target.value })
              }
              value={product.categoryCode}
              label="category"
            >
              {map(categories, (category) => (
                <MenuItem value={category.code}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Furniture Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product.name}
          />

          <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="condition">Condition</InputLabel>
            <Select
              labelId="condition"
              id="condition_select"
              onChange={(e) =>
                setProduct({ ...product, condition: e.target.value })
              }
              value={product.condition}
              label="condition"
            >
              <MenuItem value={'new'}>New</MenuItem>
              <MenuItem value={'likenew'}>Like New</MenuItem>
              <MenuItem value={'good'}>Good</MenuItem>
              <MenuItem value={'fair'}>Fair</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Description (Optional)"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            value={product.description}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProduct(defaultProductValues);
              handleClose(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              new Promise<{ data: FormData }>((resolve) => {
                const fd = new FormData();

                const formData = new FormData();

                formData.append('name', product.name);
                formData.append('description', product.description as string);
                formData.append('categoryCode', product.categoryCode);
                formData.append(
                  'productLocation',
                  `${product.productLocation}`
                );
                formData.append('condition', product.condition);
                if (product.image) {
                  formData.append('image', product.image[0]);
                }
                resolve({ data: formData });
              }).then((result) => {
                const { data } = result;
                axios
                  .post('/api/products/new', data, {
                    headers: { 'content-type': 'multipart/form-data' },
                  })
                  .then(() => {
                    setProduct(defaultProductValues);
                    handleClose(false);
                    console.log('Product Saved!');
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }}
          >
            Donate and Save The World!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
