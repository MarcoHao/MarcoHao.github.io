# **视频生成工作流** *Multi-stage Video Generation with FunControl and ReCamMaster*

### ——多模态控制与高效迭代的生成式视频实验

> Diffusion, Video, Wan  
> [ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper)  
> [ReCamMaster](https://github.com/KwaiVGI/ReCamMaster)

**在 ComfyUI 框架下实现了一套两阶段视频生成策略：先用 FunControl 生成受控动作与场景骨架，再通过 ReCamMaster + WAN Video Wrapper 对输出片段进行视角重构。该流程兼顾控制精度与镜头多样性，提升了视觉表达的可控性与生成效率。**

---

### **项目概述｜Content**
<video controls width="100%" preload="metadata" class="markdown-vide">
  <source src="对比视频.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

WAN 原生工作流中，FunControl（动作/内容控制）与 FunCamera/CameraPose（镜头控制）无法在同一推理周期并行执行，这是底层实现的固有限制。**基于这一现实，本项目提出并实现了一个两阶段视频生成工作流：内容控制+镜头移动，该方法绕过了原生限制，在保证动作一致性的同时，扩展了镜头与构图的多样性。**

---

### **工作流架构与实现要点**
![WAN视频生成工作流.png](WAN视频生成工作流.png)
**Stage A**：以高噪声与低噪声模型结合快速生成视频骨架，锁定动作、角色；此阶段侧重人物的把控，而非视角的控制。  

<video controls width="100%" preload="metadata" loop muted class="markdown-vide">
  <source src="OnlyControl-high-noise.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

<video controls width="100%" preload="metadata" class="markdown-vide">
  <source src="OnlyControl-low-noise.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

**Stage B**：将 Stage A 的片段导入 ReCamMaster，重新生成 CameraPose，并在 WAN Video Wrapper 中以低噪、更高采样进行细节补偿与降噪处理，从而得到多镜头版本与更丰富的视觉语言。  

<video controls width="100%" preload="metadata" class="markdown-vide">
  <source src="translate-up.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

**参数策略**：在 Stage A 使用更高噪声、较低采样步数以加快多方案探索；在 Stage B 使用更低噪声、更高采样与更精细的 CFG/控制权重以提升视觉质量。

---

### **对比分析**

<video controls width="100%" preload="metadata" class="markdown-vide">
  <source src="OnlyCamera.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

<video controls width="100%" preload="metadata" class="markdown-vide">
  <source src="Control+Camera.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

**动作稳定性**：两阶段的过程保证了动作与时序的一致性，避免了后期镜头调整对主体动作造成冲突，可以更灵活地对画面内容进行调整和丰富。
**镜头多样性**：通过 ReCamMaster，可在不改变原始动作轨迹的前提下生成不同的镜头语言（推近、拉远、移位、倾斜等），扩展了表达空间。
而Wan2.2 FunCamera只能从静帧出发，在其中不能够直接控制人物的动作，对内容创作来说有局限性。

---

### **结论与价值**
该两阶段策略是一种工程化的折衷方案：它承认并尊重原生模型的结构性限制，但通过系统层面的封装与二次生成实现了功能扩展。在不可改动底层模型的前提下，提出了可工程化部署的解决路径；将设计意图（动作/叙事）与镜头语言（CameraPose）解耦，再组合以获得更丰富的视觉产出。  
