# Tessera UI 框架

Tessera 是一个面向 Rust 的声明式、立即模式 UI 框架，强调通过函数式方法与可插拔着色器系统实现的性能、灵活性和可扩展性。
架构概览

Tessera 的架构围绕几个核心概念构建：

- 声明式组件：使用 `#[tessera]` 宏以函数的形式定义 UI 组件
- 立即模式：UI 在每一帧重建，确保一致性和简洁性
- 可插拔着色器：自定义 WGPU 着色器是一等公民，可用于高级视觉效果
- 并行处理：诸如测量等核心操作利用并行计算
- 显式状态管理：组件无状态，状态通过显式传递

## 按了解层级的快速入门

🟢 **初级** - 构建基础应用

如果你是 Tessera 新手并希望使用现有组件构建应用：

可从以下模块入手：

- `renderer` - 核心渲染器与应用生命周期管理
- `Dp`, `Px` - 用于布局的基本测量单位
- `Color` - 颜色系统，用于组件样式

需要理解的关键概念：

- 如何设置 `Renderer` 并运行应用
- 使用 `tessera_basic_components` 获取常用 UI 元素
- 使用 `row`、`column` 和 `surface` 等组件进行基础布局

```rust
use tessera_ui::{Renderer, Color, Dp};
use tessera_ui_basic_components::*;
use tessera_ui_macros::tessera;

#[tessera]
fn my_app() {
    surface(
        SurfaceArgs {
            color: Color::WHITE,
            padding: Dp(20.0),
            ..Default::default()
        },
        None,
        || text("Hello, Tessera!"),
    );
}
```

🟡 **中级** - 自定义布局与交互

对于希望创建自定义组件并处理复杂布局的开发者：

必备函数与类型：

- `measure_node` - 在约束下测量子组件尺寸
- `place_node` - 在布局中定位子组件
- `StateHandlerFn` - 处理用户交互与状态变化
- `Constraint`, `DimensionValue` - 布局约束系统
- `ComputedData` - 返回计算的尺寸与布局信息

关键概念：

- 理解测量与放置阶段
- 创建自定义布局算法
- 通过显式的状态处理函数管理组件状态
- 使用基于约束的布局系统

```rust
use tessera_ui::{measure_node, place_node, ComputedData, Constraint, PxPosition};
use tessera_ui_macros::tessera;

#[tessera]
fn custom_layout() {
    measure(|input| {
        let mut total_width = 0;
        for (i, &child_id) in input.children_ids.iter().enumerate() {
            let child_size = measure_node(child_id, input.parent_constraint, input.metadatas)?;
            place_node(child_id, PxPosition::new(total_width.into(), 0.into()), input.metadatas);
            total_width += child_size.width.to_i32();
        }
        Ok(ComputedData::from_size((total_width.into(), input.parent_constraint.height.min_value())))
    });

    state_handler(|input| {
        // 在此处理用户交互
    });
}
```

🔴 **高级** - 自定义渲染管线

对于构建自定义视觉效果和渲染管线的开发者：

高级渲染模块：

- `renderer::drawer` - 自定义可绘制管线与绘制命令
- `renderer::compute` - 用于高级效果的 GPU 计算管线
- `DrawCommand`, `ComputeCommand` - 低级渲染命令
- `DrawablePipeline`, `ComputablePipeline` - 管线 trait 的实现
- `PipelineRegistry`, `ComputePipelineRegistry` - 管线管理

关键概念：

- 创建自定义 WGPU 着色器与渲染管线
- 管理 GPU 资源与计算操作
- 理解渲染命令系统
- 实现高级视觉效果，例如光照、阴影与粒子效果

```rust
use tessera_ui::renderer::{DrawCommand, DrawablePipeline};
use wgpu::{Device, Queue, RenderPass};

struct MyCustomPipeline {
    // 管线状态
}

impl DrawablePipeline for MyCustomPipeline {
    fn draw<'a>(&'a self, render_pass: &mut RenderPass<'a>) {
        // 自定义渲染逻辑
    }
}
```

## 核心模块

必要的类型与函数

- `Renderer` - 主渲染器与应用生命周期管理器
- `measure_node`, `place_node` - 核心布局函数
- `Constraint`, `DimensionValue` - 布局约束系统
- `Dp`, `Px` - 测量单位（设备无关与像素单位）
- `Color` - 颜色表示与工具函数

组件系统

- `ComponentTree` - 组件树管理
- `ComponentNode` - 单个组件节点表示
- `ComputedData` - 布局计算结果
- `StateHandlerFn` - 状态管理与事件处理

事件处理

- `CursorEvent` - 鼠标与触摸输入事件
- `Focus` - 焦点管理系统
- `PressKeyEventType` - 键盘输入处理

渲染系统

- `renderer::drawer` - 绘制管线系统
- `renderer::compute` - 计算管线系统
- `DrawCommand`, `ComputeCommand` - 渲染命令

## 示例

在工作区中的示例 crate 中查看完整示例，示例展示：

- 基本组件使用
- 自定义布局与交互
- 高级着色器效果
- 跨平台部署（Windows、Linux、macOS、Android）

## 性能考虑

Tessera 的高性能设计体现在：

- 使用 Rayon 进行并行测量计算
- 通过自定义着色器实现高效 GPU 利用
- 在热点路径中尽量减少分配
- 优化的组件树遍历
