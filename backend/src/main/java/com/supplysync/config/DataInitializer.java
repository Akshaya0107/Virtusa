package com.supplysync.config;

import com.supplysync.entity.*;
import com.supplysync.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private SupplierRepository supplierRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private PurchaseOrderRepository purchaseOrderRepository;
    @Autowired private SalesRecordRepository salesRecordRepository;
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private ETAConfirmationRepository etaRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        initializeRoles();
        User manager = initializeDemoUsers();
        List<Category> categories = initializeCategories();
        List<Supplier> suppliers = initializeSuppliers();
        List<Product> products = initializeProducts(categories);
        initializePurchaseOrders(manager, suppliers, products);
        initializeSales(products);
        initializeNotifications();
        initializeETAConfirmations();
        initializeFinanceData(suppliers, products);
    }

    @Autowired private SupplierCostRepository supplierCostRepository;
    @Autowired private SupplierPaymentRepository supplierPaymentRepository;
    @Autowired private BudgetRepository budgetRepository;
    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private ExpenseRecordRepository expenseRecordRepository;

    private void initializeFinanceData(List<Supplier> suppliers, List<Product> products) {
        if (budgetRepository.count() == 0) {
            budgetRepository.save(Budget.builder()
                    .monthlyBudget(new BigDecimal("5000000"))
                    .usedBudget(new BigDecimal("2500000"))
                    .remainingBudget(new BigDecimal("2500000"))
                    .fiscalYear("2026")
                    .month("JUNE")
                    .allocatedAmount(new BigDecimal("5000000"))
                    .budgetYear(2026)
                    .budgetMonth(java.time.Month.JUNE)
                    .usedAmount(new BigDecimal("2500000"))
                    .build());
        }

        if (supplierCostRepository.count() == 0) {
            for (Supplier s : suppliers) {
                supplierCostRepository.save(SupplierCost.builder()
                        .supplier(s)
                        .totalPurchaseCost(new BigDecimal(100000 + new Random().nextInt(400000)))
                        .lastTransactionDate(LocalDateTime.now().minusDays(new Random().nextInt(30)))
                        .unitCost(new BigDecimal(100 + new Random().nextInt(400)))
                        .effectiveDate(LocalDateTime.now().minusDays(new Random().nextInt(30)))
                        .currency("INR")
                        .build());
            }
        }

        if (supplierPaymentRepository.count() == 0) {
            for (Supplier s : suppliers) {
                supplierPaymentRepository.save(SupplierPayment.builder()
                        .supplier(s)
                        .amount(new BigDecimal(50000 + new Random().nextInt(150000)))
                        .paymentDate(LocalDateTime.now().minusDays(new Random().nextInt(15)))
                        .status(SupplierPayment.PaymentStatus.PAID)
                        .transactionReference("TXN-" + System.currentTimeMillis() + s.getId())
                        .build());
            }
        }

        if (expenseRecordRepository.count() == 0) {
            String[] categories = {"Electronics", "Logistics", "Warehouse", "Supplier Charges"};
            for (String cat : categories) {
                expenseRecordRepository.save(ExpenseRecord.builder()
                        .category(cat)
                        .amount(new BigDecimal(200000 + new Random().nextInt(800000)))
                        .expenseDate(LocalDateTime.now().minusDays(new Random().nextInt(30)))
                        .description("Monthly " + cat + " expense")
                        .build());
            }
        }

        if (auditLogRepository.count() == 0) {
            User financeAdmin = userRepository.findByEmail("finance@supplysync.com").orElse(null);
            auditLogRepository.save(AuditLog.builder()
                    .user(financeAdmin)
                    .adminName("Finance Admin")
                    .action("REPORT_GENERATED")
                    .description("Generated Monthly Procurement Report")
                    .timestamp(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .build());
        }
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            for (Role.RoleType roleType : Role.RoleType.values()) {
                roleRepository.save(new Role(null, roleType));
            }
        }
    }

    private User initializeDemoUsers() {
        String commonPassword = passwordEncoder.encode("password");
        User storeManager = null;
        
        String[][] users = {
            {"storemanager@supplysync.com", "ROLE_STORE_MANAGER", "Store Manager"},
            {"warehouse@supplysync.com", "ROLE_WAREHOUSE", "Warehouse Staff"},
            {"supplier@supplysync.com", "ROLE_SUPPLIER", "Supplier Partner"},
            {"finance@supplysync.com", "ROLE_FINANCE_ADMIN", "Finance Admin"}
        };

        for (String[] userData : users) {
            String email = userData[0];
            Role.RoleType roleType = Role.RoleType.valueOf(userData[1]);
            String name = userData[2];

            if (userRepository.findByEmail(email).isEmpty()) {
                User user = User.builder()
                        .fullName(name)
                        .email(email)
                        .password(commonPassword)
                        .phone("1234567890")
                        .roles(new HashSet<>(Collections.singletonList(roleRepository.findByName(roleType).get())))
                        .build();
                User saved = userRepository.save(user);
                if (roleType == Role.RoleType.ROLE_STORE_MANAGER) storeManager = saved;
            } else if (roleType == Role.RoleType.ROLE_STORE_MANAGER) {
                storeManager = userRepository.findByEmail(email).get();
            }
        }
        return storeManager;
    }

    private List<Category> initializeCategories() {
        if (categoryRepository.count() == 0) {
            String[] names = {"Electronics", "Office", "Furniture", "Hardware", "Tools", "Safety", "Networking", "Software", "Packaging", "Maintenance"};
            for (String name : names) {
                categoryRepository.save(new Category(name, name + " equipment"));
            }
        }
        return categoryRepository.findAll();
    }

    private List<Supplier> initializeSuppliers() {
        if (supplierRepository.count() == 0) {
            for (int i = 1; i <= 20; i++) {
                supplierRepository.save(Supplier.builder()
                        .name("Supplier " + i)
                        .contactPerson("Agent " + i)
                        .email("supplier" + i + "@example.com")
                        .phone("555-01" + i)
                        .build());
            }
        }
        return supplierRepository.findAll();
    }

    private List<Product> initializeProducts(List<Category> categories) {
        Random rand = new Random();
        if (productRepository.count() == 0) {
            for (int i = 1; i <= 100; i++) {
                Category cat = categories.get(rand.nextInt(categories.size()));
                Product product = productRepository.save(Product.builder()
                        .sku("SKU-" + String.format("%05d", i))
                        .name("Product " + i)
                        .price(BigDecimal.valueOf(10.0 + rand.nextDouble() * 100.0))
                        .category(cat)
                        .qrCode("QR-" + i)
                        .build());
                
                inventoryRepository.save(Inventory.builder()
                        .product(product)
                        .quantity(rand.nextInt(100))
                        .minThreshold(10)
                        .location("A-" + i)
                        .build());
            }
        }
        return productRepository.findAll();
    }

    private void initializePurchaseOrders(User manager, List<Supplier> suppliers, List<Product> products) {
        if (purchaseOrderRepository.count() == 0) {
            Random rand = new Random();
            for (int i = 1; i <= 50; i++) {
                PurchaseOrder po = PurchaseOrder.builder()
                        .orderNumber("PO-" + (1000 + i))
                        .supplier(suppliers.get(rand.nextInt(suppliers.size())))
                        .status(PurchaseOrder.OrderStatus.PENDING)
                        .createdBy(manager)
                        .totalAmount(BigDecimal.ZERO)
                        .build();
                purchaseOrderRepository.save(po);
            }
        }
    }

    private void initializeSales(List<Product> products) {
        if (salesRecordRepository.count() == 0) {
            Random rand = new Random();
            for (int i = 1; i <= 100; i++) {
                Product p = products.get(rand.nextInt(products.size()));
                salesRecordRepository.save(SalesRecord.builder()
                        .product(p)
                        .quantity(1 + rand.nextInt(5))
                        .totalPrice(p.getPrice().multiply(BigDecimal.valueOf(2)))
                        .saleDate(LocalDateTime.now())
                        .build());
            }
        }
    }

    private void initializeNotifications() {
        if (notificationRepository.count() == 0) {
            for (int i = 1; i <= 20; i++) {
                notificationRepository.save(Notification.builder()
                        .title("Notification " + i)
                        .message("System message " + i)
                        .type("INFO")
                        .build());
            }
        }
    }

    private void initializeETAConfirmations() {
        if (etaRepository.count() == 0) {
            List<PurchaseOrder> orders = purchaseOrderRepository.findAll();
            for (int i = 0; i < 10 && i < orders.size(); i++) {
                PurchaseOrder po = orders.get(i);
                po.setStatus(PurchaseOrder.OrderStatus.CONFIRMED);
                purchaseOrderRepository.save(po);

                etaRepository.save(ETAConfirmation.builder()
                        .purchaseOrder(po)
                        .shipmentDate(LocalDateTime.now().minusDays(2))
                        .expectedDeliveryDate(LocalDateTime.now().plusDays(3))
                        .vehicleNumber("KA-0" + (i + 1) + "-XY-" + (1000 + i))
                        .deliveryNotes("Regular shipment " + (i + 1))
                        .status(ETAConfirmation.ETAStatus.ON_TIME)
                        .build());
            }
        }
    }
}
