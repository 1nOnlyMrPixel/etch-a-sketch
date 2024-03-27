//SET CONTAINER HEIGHT AND WIDTH HERE 
const containerHeight=500;
const containerWidth=700;

const body=document.querySelector("body");
const container=document.createElement("div");
container.setAttribute("style",`height:${containerHeight}px;width:${containerWidth}px;margin:40px auto;border:2px solid black;display:flex;flex-wrap:wrap; justify-content:center`);
body.appendChild(container);
function create_no_of_Grids(n)
{
    for(let i=0;i<n;i++)
        { 
            const rowBlocks=document.createElement("div");
            rowBlocks.setAttribute("style","display:flex");
            rowBlocks.setAttribute("id",`row${i}`);
            for(let j=0;j<n;j++)
            {
                console.log(`i=${i}\nj=${j}`);
            const pixelDiv=document.createElement("div");
            pixelDiv.setAttribute("id",`row${i}col${j}`);
            setpixelStyle(pixelDiv,n);
            rowBlocks.appendChild(pixelDiv);
            pixelDiv.addEventListener("mouseover",effect);
        }
        container.appendChild(rowBlocks);
}
}
function setpixelStyle(elemnt,n)
{
    let perboxHeight=containerHeight/n;
    let perboxWidth=containerWidth/n;
    elemnt.setAttribute("style",`border:1px solid royalblue;height:${perboxHeight}px;width:${perboxWidth}px;box-sizing:border-box`);
}
function effect(e)
{
    document.getElementById(`${e.target.id}`).style["background-color"]="royalblue";
}
create_no_of_Grids(2);