import os
from PIL import Image


def convert_to_webp(
        root_folders,
        quality=85,
        skip_if_smaller=True,
        ignored_dirs=None,
):
    if ignored_dirs is None:
        ignored_dirs = set()

    for folder in root_folders:
        for root, dirs, files in os.walk(folder):
            dirs[:] = [d for d in dirs if d not in ignored_dirs]  # 忽略指定目录

            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    full_path = os.path.join(root, file)
                    webp_path = os.path.splitext(full_path)[0] + '.webp'

                    try:
                        if not os.path.exists(webp_path):
                            print(f"→ Converting {full_path} -> {webp_path}")
                            with Image.open(full_path) as img:
                                img.save(webp_path, 'webp', quality=quality)

                            if skip_if_smaller and os.path.getsize(webp_path) > os.path.getsize(full_path):
                                print(f"⚠️ {webp_path} is larger than original. Removing.")
                                os.remove(webp_path)
                        else:
                            print(f"⏭ Skipped (already exists): {webp_path}")

                    except Exception as e:
                        print(f"❌ Error converting {full_path}: {e}")


if __name__ == "__main__":
    # 支持多个目录
    assets_folders = [
        "./assets",
    ]

    # 忽略特定文件夹（如缩略图、备份等）
    ignored_subdirectories = {"thumbnails", "temp"}

    convert_to_webp(
        assets_folders,
        quality=80,
        skip_if_smaller=True,
        ignored_dirs=ignored_subdirectories,
    )
    print("✅ WebP batch conversion finished.")