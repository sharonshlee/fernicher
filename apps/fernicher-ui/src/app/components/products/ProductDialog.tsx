import { Dialog } from '@mui/material';
import ProductsSocialCard from './ProductsSocialCard';

export const ProductDialog = (props: any) => {
  const { setDetail, detail } = props;
  return (
    <Dialog
      open={true}
      onClose={() => {
        setDetail({ expanded: false, product: null });
      }}
      maxWidth="lg"
    >
      <ProductsSocialCard
        setExpanded={(id: number, isExpanded: boolean) =>
          setDetail({ ...detail, expanded: isExpanded })
        }
        expanded={detail.expanded}
        usersAndProduct={detail.product}
        maxWidth="110vh"
        minWidth="110vh"
      />
    </Dialog>
  );
};
