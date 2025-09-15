---
title: Image
order: 11
---

# Image

```rust
pub fn image(args: impl Into<ImageArgs>)
```

`image` 组件用于显示图片。

值得一提的是，`image` 组件本身不持有图片数据，而是通过 `ImageArgs` 传入 `Arc<ImageData>` 来引用图片数据。

而 `ImageData` 需通过 `tessera_ui_basic_components::image::load_image_from_source` 加载，其相关定义如下

```rust
pub fn load_image_from_source(
    source: &ImageSource,
) -> Result<ImageData, ImageError>;

pub enum ImageSource {
    Path(String),
    Bytes(Arc<[u8]>),
}
```

下面给出一个加载内嵌二进制的图片内容为 `ImageData` 的例子

```rust
let image_bytes = Arc::new(*include_bytes!("../../example/examples/assets/scarlet_ut.jpg"));
let image_data = load_image_from_source(&ImageSource::Bytes(image_bytes))
    .expect("Failed to load image");
```

## 参数

- `args: impl Into<ImageArgs>`

  该参数用于配置 `image` 组件，包括图片数据、组件大小等属性。可以使用 `ImageArgsBuilder` 来构建。

## 预览

![image](/image_example.png)
