import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardStats } from "./dto/dashboard-stats.type";
import { GqlAuthGuard } from "../common/guards/gql-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Resolver()
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => DashboardStats)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles("MANAGER")
  async dashboardStats(): Promise<DashboardStats> {
    return this.dashboardService.getStats();
  }
}
