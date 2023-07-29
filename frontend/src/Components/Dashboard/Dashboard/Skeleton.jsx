import React from 'react';
import * as DashboardComponents from "./Style";
import { Skeleton } from 'antd';
function DashboarSkeleton() {
    return (
        <DashboardComponents.SkeletonDashboardContainer>
            <DashboardComponents.SkeletonDashboardOuter>
                <DashboardComponents.SkeletonDashboardBoards>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <DashboardComponents.SkeletonCard key={index}>
                            <Skeleton active paragraph={{ rows: 2 }} />
                            <DashboardComponents.AvatarIconWrapper>
                                <Skeleton.Avatar active size={30} shape="circle" />
                            </DashboardComponents.AvatarIconWrapper>
                            </DashboardComponents.SkeletonCard>
                    ))}
                </DashboardComponents.SkeletonDashboardBoards>
            </DashboardComponents.SkeletonDashboardOuter>
        </DashboardComponents.SkeletonDashboardContainer>
    );
}

export default DashboarSkeleton;
