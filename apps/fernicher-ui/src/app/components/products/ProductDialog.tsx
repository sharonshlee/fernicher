import { Dialog } from '@mui/material';
import { map } from 'lodash';
import { useState } from 'react';
import ProductsSocialCard from './ProductsSocialCard';

export const ProductDialog = (props: any) => {
  const { setDetail, detail, setProducts } = props;
  const [detailCommentExpanded, setDetailCommentExpanded] = useState(false);

  return (
    <Dialog
      open={true}
      onClose={() => {
        setDetail({ expanded: false, product: null });
      }}
      maxWidth="lg"
      scroll="body"
    >
      <ProductsSocialCard
        setUsersAndProduct={(product: any) => {
          setProducts((prev: any[]) => {
            return map(prev, (p) => {
              if (p.id === product.id) {
                return product;
              }
              return p;
            });
          });
        }}
        setExpanded={(id: number, isExpanded: boolean) =>
          setDetail({ ...detail, expanded: isExpanded })
        }
        setCommentExpanded={(id: number, isExpanded: boolean) =>
          setDetailCommentExpanded(isExpanded)
        }
        expanded={detail.expanded}
        usersAndProduct={detail.product}
        commentExpanded={detailCommentExpanded}
        maxWidth="110vh"
        minWidth="110vh"
      />
    </Dialog>
  );
};
