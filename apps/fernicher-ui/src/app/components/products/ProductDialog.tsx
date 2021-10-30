import { Dialog } from '@mui/material';
import ProductsSocialCard from './ProductsSocialCard';

export const ProductDialog = (props: any) => {
  const {
    setDetail,
    detail,
    commentExpanded,
    setCommentExpanded,
    setProducts,
  } = props;
  return (
    <Dialog
      open={true}
      onClose={() => {
        setDetail({ expanded: false, product: null });
      }}
      maxWidth="lg"
    >
      <ProductsSocialCard
        setUsersAndProduct={(product: any) =>
          setProducts((prev: []) => [...prev, product])
        }
        setExpanded={(id: number, isExpanded: boolean) =>
          setDetail({ ...detail, expanded: isExpanded })
        }
        setCommentExpanded={(id: number, isExpanded: boolean) =>
          setCommentExpanded({ ...commentExpanded, [id]: isExpanded })
        }
        expanded={detail.expanded}
        usersAndProduct={detail.product}
        commentExpanded={commentExpanded.expanded}
        maxWidth="110vh"
        minWidth="110vh"
      />
    </Dialog>
  );
};
