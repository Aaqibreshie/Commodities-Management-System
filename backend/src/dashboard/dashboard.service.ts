import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DashboardStats } from "./dto/dashboard-stats.type";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(): Promise<DashboardStats> {
    const [totalProducts, totalQuantity, products, categoryData] =
      await Promise.all([
        this.prisma.product.count(),
        this.prisma.product.aggregate({
          _sum: { quantity: true },
        }),
        this.prisma.product.findMany(),
        this.prisma.product.groupBy({
          by: ["category"],
          _count: { id: true },
          _sum: { quantity: true },
        }),
      ]);

    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );
    const lowStockProducts = products.filter((p) => p.quantity < 50).length;

    const categoryStats = categoryData.map((cat) => ({
      category: cat.category,
      count: cat._count.id,
      totalQuantity: cat._sum.quantity || 0,
    }));

    return {
      totalProducts,
      totalQuantity: totalQuantity._sum.quantity || 0,
      totalValue: Math.round(totalValue * 100) / 100,
      lowStockProducts,
      categoryStats,
    };
  }
}
