package com.supplysync.modules.storemanager.mapper;

import com.supplysync.entity.Product;
import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.PurchaseOrderItem;
import com.supplysync.entity.Supplier;
import com.supplysync.modules.storemanager.dto.PurchaseOrderResponseDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-18T14:36:06+0530",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PurchaseOrderMapperImpl implements PurchaseOrderMapper {

    @Override
    public PurchaseOrderResponseDTO toResponseDto(PurchaseOrder po) {
        if ( po == null ) {
            return null;
        }

        PurchaseOrderResponseDTO purchaseOrderResponseDTO = new PurchaseOrderResponseDTO();

        purchaseOrderResponseDTO.setSupplierId( poSupplierId( po ) );
        purchaseOrderResponseDTO.setSupplierName( poSupplierName( po ) );
        purchaseOrderResponseDTO.setItems( purchaseOrderItemListToOrderItemResponseDTOList( po.getItems() ) );
        purchaseOrderResponseDTO.setExpectedDeliveryDate( po.getExpectedDeliveryDate() );
        purchaseOrderResponseDTO.setId( po.getId() );
        purchaseOrderResponseDTO.setOrderDate( po.getOrderDate() );
        purchaseOrderResponseDTO.setOrderNumber( po.getOrderNumber() );
        if ( po.getStatus() != null ) {
            purchaseOrderResponseDTO.setStatus( po.getStatus().name() );
        }
        purchaseOrderResponseDTO.setTotalAmount( po.getTotalAmount() );

        return purchaseOrderResponseDTO;
    }

    @Override
    public PurchaseOrderResponseDTO.OrderItemResponseDTO toItemResponseDto(PurchaseOrderItem item) {
        if ( item == null ) {
            return null;
        }

        PurchaseOrderResponseDTO.OrderItemResponseDTO orderItemResponseDTO = new PurchaseOrderResponseDTO.OrderItemResponseDTO();

        orderItemResponseDTO.setProduct_id( itemProductId( item ) );
        orderItemResponseDTO.setProductName( itemProductName( item ) );
        orderItemResponseDTO.setQuantity( item.getQuantity() );
        orderItemResponseDTO.setUnitPrice( item.getUnitPrice() );

        return orderItemResponseDTO;
    }

    private Long poSupplierId(PurchaseOrder purchaseOrder) {
        Supplier supplier = purchaseOrder.getSupplier();
        if ( supplier == null ) {
            return null;
        }
        return supplier.getId();
    }

    private String poSupplierName(PurchaseOrder purchaseOrder) {
        Supplier supplier = purchaseOrder.getSupplier();
        if ( supplier == null ) {
            return null;
        }
        return supplier.getName();
    }

    protected List<PurchaseOrderResponseDTO.OrderItemResponseDTO> purchaseOrderItemListToOrderItemResponseDTOList(List<PurchaseOrderItem> list) {
        if ( list == null ) {
            return null;
        }

        List<PurchaseOrderResponseDTO.OrderItemResponseDTO> list1 = new ArrayList<PurchaseOrderResponseDTO.OrderItemResponseDTO>( list.size() );
        for ( PurchaseOrderItem purchaseOrderItem : list ) {
            list1.add( toItemResponseDto( purchaseOrderItem ) );
        }

        return list1;
    }

    private Long itemProductId(PurchaseOrderItem purchaseOrderItem) {
        Product product = purchaseOrderItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getId();
    }

    private String itemProductName(PurchaseOrderItem purchaseOrderItem) {
        Product product = purchaseOrderItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getName();
    }
}
